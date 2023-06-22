const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require('chalk');
const portfinder = require("portfinder");

const { fetchGatsbyNodeDynamicConfigData } = require("./src/helpers/nodeHelpers");
const fetchFavicon = require("./src/helpers/build-helpers/fetchFavicon");
const { createMapping } = require("./src/helpers/build-helpers/helpers");

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const fsPromises = fs.promises;

async function fetchSiteUrl() {
    try {
        const siteUrl = await fetchGatsbyNodeDynamicConfigData({
            baseId: process.env.AIRTABLE_BASE_ID,
            fields: "Value",
            labelColumnName: "Label",
            labelValue: "Web URL",
            supposedStartingValue: "http",
            expectedValueName: "Site URL",
        });

        const envFilePath = path.join(process.cwd(), `.env.${process.env.NODE_ENV}`);
        const envFileContent = fs.readFileSync(envFilePath, "utf8");
        const newEnvFileContent = envFileContent.replace(/^SITE_URL.*$/m, `SITE_URL=${siteUrl}`);

        fs.writeFileSync(envFilePath, newEnvFileContent, "utf8");

        console.log(chalk.green("success ") + `Site URL: ${siteUrl}`);
        console.log(chalk.green("success ") + `dotenv file successfully updated!`);
    } catch (err) {
        console.error(err);
        // Exit process with status 1
        process.exit(1);
    }
}

async function fetchAirtableTables() {
    try {
        const firstResponse = await axios({
            baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Metadata?maxRecords=5000`,
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
        });

        // Chain a new request to fetch the next page of records using the offset parameter until the offset parameter is null
        const allResponses = [firstResponse];
        let offset = firstResponse.data.offset;
        while (offset) {
            const response = await axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Metadata?maxRecords=5000&offset=${offset}`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            });
            allResponses.push(response);
            offset = response.data.offset;
        }

        console.log(chalk.green("success ") + allResponses.length + " pages of Airtable tables successfully fetched");

        // Flatten all responses into one array
        const responsesData = allResponses.map((response) => response.data.records);
        const allRecords = responsesData.flat();

        console.log(chalk.green("success ") + allRecords.length + " records successfully fetched");

        const categories = new Set();
        allRecords.forEach(
            (record) => {
                categories.add(record.fields.tableName);
            }
        );

        const tableArray = []
        categories.forEach((category) => {
            tableArray.push({
                baseId: process.env.AIRTABLE_BASE_ID,
                tableName: category,
                mapping: createMapping(category),
            })
        });

        // Save table array in config/airtable-tables.json
        const airtableTablesPath = path.join(process.cwd(), "config", "airtable-tables.json");

        // Check if airtalbe-tables.json exists
        if (!fs.existsSync(airtableTablesPath)) {
            // Check if the config folder exists and create it if it doesn't
            if (!fs.existsSync(path.join(process.cwd(), "config"))) {
                fs.mkdirSync(path.join(process.cwd(), "config"));
            }
            // Create an empty airtalbe-tables.json
            fs.writeFileSync(airtableTablesPath, "");
        }

        fs.writeFileSync(airtableTablesPath, JSON.stringify(tableArray), "utf8");
        console.log(chalk.green("success ") + `Airtable tables successfully fetched and saved in airtable-tables.json`);

    } catch (err) {
        console.error(chalk.red("error " + "Error fetching Airtable tables"));
        console.error(err.message);
        console.error(err.stack);
        process.exit(1);
    }
}

async function fetchAirTableStaticFiles() {
    try {
        const response = await axios({
            baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=File&filterByFormula={Label}="staticFiles"`,
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
        });

        if (!response.data.records.length || !response.data.records[0].fields.File) {
            throw new Error("No static files to download");
        }

        // Move fetched files to the static folder
        const staticFiles = response.data.records[0].fields.File;
        const staticFilesPath = path.join(process.cwd(), "static");

        for (let file of staticFiles) {
            const filePath = path.join(staticFilesPath, file.filename);
            const fileUrl = file.url;

            // Download file from file.url using axios
            const fileResponse = await axios({
                url: fileUrl,
                method: "GET",
                responseType: "stream",
            });

            // Write file to static folder
            await fsPromises.writeFile(filePath, fileResponse.data);
        }
        console.log(chalk.green("success ") + staticFiles.length + " static files successfully fetched and transferred to the static folder");
    } catch (err) {
        if (err.message === "No static files to download") {
            console.log(chalk.yellow("warn ") + "No static files to download");
        } else {
            console.error(chalk.red("error ") + err);
            process.exit(1);
        }
    }
}

async function donwloadAndMoveFavicons() {
    // Fetch favicon data from Airtable
    const faviconPromise = axios({
        baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=File&filterByFormula={Label}="Favicon"`,
        headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    });

    const colorSecondaryPromise = axios({
        baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="colorSecondary"`,
        headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    });

    const [faviconResponse, colorSecondaryResponse] = await Promise.all([faviconPromise, colorSecondaryPromise]);

    const rawFaviconUrl = faviconResponse.data.records[0].fields.File[0].url;
    const colorSecondary = colorSecondaryResponse.data.records[0].fields.Value;

    const faviconData = await fetchFavicon({ originalFaviconUrl: rawFaviconUrl, colorSecondary: colorSecondary });

    for (let fileUrl of faviconData.favicon_generation_result.favicon.files_urls) {
        const fileResponse = await axios({
            url: fileUrl,
            method: "GET",
            responseType: "stream",
        });

        const filePath = path.join(process.cwd(), "static", fileUrl.split("/").pop());
        await fsPromises.writeFile(filePath, fileResponse.data);
    }
    console.log(chalk.green("success ") + "Favicons successfully downloaded and transferred to the static folder");
}

// TODO: Dynamically change backend ecosystem.config.js file.
async function changeBackendEcosystemConfig() {
    const ecosystemConfigPath = path.join(process.cwd(), "backend", "ecosystem.config.js");
    const ecosystemConfig = require(ecosystemConfigPath);

    // Fetch the Programmatic Business Name from Airtable Config Table
    const response = await axios({
        baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Programmatic Business Name"`,
        headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    });

    const programmaticBusinessName = response.data.records[0].fields.Value;

    ecosystemConfig.apps[0].name = programmaticBusinessName;

    fs.writeFileSync(ecosystemConfigPath, `module.exports = ${JSON.stringify(ecosystemConfig)}`, "utf8");
    console.log(chalk.green("success ") + "Backend ecosystem.config.js successfully changed");
}

async function findOpenPort() {
    portfinder.basePort = 3000;
    portfinder.highestPort = 4000;
    const freePort = await portfinder.getPortPromise();

    console.log(chalk.green("success ") + `Found free port: ${freePort}`);

    // Replace the port env variable in the .env file in backend/.env
    const backendEnvFilePath = path.join(process.cwd(), "backend", ".env");
    const backendEnvFileContent = fs.readFileSync(backendEnvFilePath, "utf8");
    const newBackendEnvFileContent = backendEnvFileContent.replace(/^PORT.*$/m, `PORT=${freePort}`);

    fs.writeFileSync(backendEnvFilePath, newBackendEnvFileContent, "utf8");
}

async function main() {
    const promises = [fetchSiteUrl(), fetchAirtableTables(), changeBackendEcosystemConfig()];

    if (process.env.NODE_ENV === "production") {
        // Clean up the static folder
        const staticFolderPath = path.join(process.cwd(), "static");
        if (fs.existsSync(staticFolderPath)) {
            await fsPromises.rm(staticFolderPath, { recursive: true });
            await fsPromises.mkdir(staticFolderPath);
        } else await fsPromises.mkdir(staticFolderPath);

        promises.push(donwloadAndMoveFavicons())
        promises.push(fetchAirTableStaticFiles())
        // promises.push(findOpenPort())
        // promises.push(changeBackendEcosystemConfig());
    }

    // Promise.all on all promises
    await Promise.all(promises);
}

main();
