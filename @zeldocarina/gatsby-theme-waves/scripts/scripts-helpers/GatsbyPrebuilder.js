const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require('chalk');
const { NodeSSH } = require('node-ssh')

const readline = require('node:readline');

const { fetchGatsbyNodeDynamicConfigData } = require("../../src/helpers/nodeHelpers");
const fetchFavicon = require("../../src/helpers/build-helpers/fetchFavicon");
const { createMapping } = require("../../src/helpers/build-helpers/helpers");

const fsPromises = fs.promises;

class GatsbyPrebuilder {
    constructor() {
        this.programmaticBusinessName;
        this.siteUrl;
    }

    static copyFolderSync(src, dest) {
        // Check if the source is a directory
        const srcStats = fs.statSync(src);
        if (srcStats.isDirectory()) {
            // Create the destination directory if it doesn't exist
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }

            // Recursively copy the contents of the source directory
            for (let file of fs.readdirSync(src)) {
                const fileSrc = path.join(src, file);
                const fileDest = path.join(dest, file);
                this.copyFolderSync(fileSrc, fileDest);
            }
        } else {
            // If the source is not a directory, just copy the file
            fs.copyFileSync(src, dest);
        }
    }

    static async askQuestion(question) {
        const answer = await new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question(question, (answer) => {
                rl.close();
                resolve(answer);
            });
        });

        return answer;
    }

    async prebuild() {
        try {
            console.log(chalk.blue("info ") + "Starting prebuild");
            if (process.env.CI) {
                console.log(chalk.blue("info ") + "Running in CI environment");
            }
            await this.setPrebuildVariables();

            const promises = [this.fetchAirtableTables(), this.replaceGatsbyConfig()];

            if (process.env.NODE_ENV === "production") {
                // Clean up the static folder
                const staticFolderPath = path.join(process.cwd(), "static");
                if (fs.existsSync(staticFolderPath)) {
                    await fsPromises.rm(staticFolderPath, { recursive: true });
                    await fsPromises.mkdir(staticFolderPath);
                } else await fsPromises.mkdir(staticFolderPath);

                promises.push(this.donwloadAndMoveFavicons());
                promises.push(this.fetchAirTableStaticFiles());

                this.moveLandings(staticFolderPath);
                // Check if we are in a ci environment
                promises.push(this.changeEnvData());
                if (!process.env.CI) {
                    promises.push(this.scpEnvFiles());
                }
            }

            await Promise.all(promises);
        } catch (error) {
            console.log(chalk.red("error ") + "error prebuilding");
            console.log(error.message);
            console.log(error.stack);
            process.exit(1);
        }
    }

    async setPrebuildVariables() {
        const configPromises = [this.getProgrammaticBusinessName(), this.fetchSiteUrl()];
        const [programmaticBusinessName, siteUrl] = await Promise.all(configPromises);

        this.programmaticBusinessName = programmaticBusinessName;
        this.siteUrl = siteUrl;
    }

    async fetchSiteUrl() {
        try {
            const siteUrl = await fetchGatsbyNodeDynamicConfigData({
                baseId: process.env.AIRTABLE_BASE_ID,
                fields: "Value",
                labelColumnName: "Label",
                labelValue: "Web URL",
                supposedStartingValue: "http",
                expectedValueName: "Site URL",
            });

            console.log(chalk.green("success ") + `Site URL: ${siteUrl}`);

            return siteUrl;
        } catch (err) {
            console.error(err);
            // Exit process with status 1
            process.exit(1);
        }
    }

    async moveLandings(staticFolderPath) {
        try {
            // Copy all folders from the src/landing-pages folder to the static folder
            const landingPagesFolderPath = path.join(process.cwd(), "src", "landing-pages");
            const landingPagesFolderContent = await fsPromises.readdir(landingPagesFolderPath);

            for (let folder of landingPagesFolderContent) {
                const folderPath = path.join(landingPagesFolderPath, folder);
                const folderStats = await fsPromises.stat(folderPath);
                if (folderStats.isDirectory()) {
                    this.constructor.copyFolderSync(folderPath, path.join(staticFolderPath, folder));
                    console.log(chalk.green("success") + " Successfully copied folder " + folder + " to static folder");
                }
            }

        } catch (err) {
            console.error(err);
            console.error(chalk.red("error ") + err);
            process.exit(1);
        }
    }

    async replaceGatsbyConfig() {
        // Change the siteUrl value in gatsby-config.js
        try {
            const gatsbyConfigPath = path.join(process.cwd(), "gatsby-config.js");
            const gatsbyConfig = fs.readFileSync(gatsbyConfigPath, "utf8");
            const newGatsbyConfig = gatsbyConfig.replace(/siteUrl: ".*"/, `siteUrl: "${this.siteUrl}"`);
            fs.writeFileSync(gatsbyConfigPath, newGatsbyConfig, "utf8");
        } catch (err) {
            console.log(chalk.red("error ") + "error replacing gatsby-config.js");
            console.log(err.message);
            console.log(err.stack);
            process.exit(1);
        }
    }

    async getProgrammaticBusinessName() {
        // Fetch the Programmatic Business Name from Airtable Config Table
        const response = await axios({
            baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Programmatic Business Name"`,
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
        });

        const programmaticBusinessName = response.data.records[0].fields.Value;

        console.log(chalk.green("success ") + `Programmatic Business Name found: ${programmaticBusinessName}`);

        return programmaticBusinessName;
    }

    async fetchAirtableTables() {
        try {
            const response = await axios({
                baseURL: `https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`,
                headers: { Authorization: `Bearer ${process.env.MATTIA_AIRTABLE_KEY}` },
            });

            const tableArray = response.data.tables.map((table) => {
                return ({
                    baseId: process.env.AIRTABLE_BASE_ID,
                    tableName: table.name,
                    mapping: createMapping(table.name),
                });
            });

            // Save table array in config/airtable-tables.json
            const airtableTablesPath = path.join(process.cwd(), "config", "airtable-tables.json");
            fs.writeFileSync(airtableTablesPath, JSON.stringify(tableArray), "utf8");
            console.log(chalk.green("success ") + `Airtable tables successfully fetched and saved in airtable-tables.json`);
        } catch (err) {
            console.error(chalk.red("error " + "Error fetching Airtable tables"));
            console.error(err.message);
            console.error(err.stack);
            process.exit(1);
        }
    }

    async fetchAirTableStaticFiles() {
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

            // Check if a static folder exists and create one if it doesn't
            const staticFolderPath = path.join(process.cwd(), "static");
            if (!fs.existsSync(staticFolderPath)) {
                await fsPromises.mkdir(staticFolderPath);
            }

            for (let file of staticFiles) {
                const filePath = path.join(staticFolderPath, file.filename);
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

    async donwloadAndMoveFavicons() {
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

    async changeEnvData() {
        try {
            const ecosystemConfigPath = path.join(process.cwd(), "backend", "ecosystem.config.js");
            const ecosystemConfig = require(ecosystemConfigPath);

            ecosystemConfig.apps[0].name = this.programmaticBusinessName;

            fs.writeFileSync(ecosystemConfigPath, `module.exports = ${JSON.stringify(ecosystemConfig)}`, "utf8");
            console.log(chalk.green("success ") + "Backend ecosystem.config.js successfully changed");

            // Change Jenkinsfile def business_name = with programmaticBusinessName
            const jenkinsfilePath = path.join(process.cwd(), "Jenkinsfile");
            const jenkinsfile = fs.readFileSync(jenkinsfilePath, "utf8");
            const newJenkinsfile = jenkinsfile.replace(/def business_name = .*/, `def business_name = "${this.programmaticBusinessName}"`);
            fs.writeFileSync(jenkinsfilePath, newJenkinsfile, "utf8");

            // Test and make sure the line is changed and now ends with the programmaticBusinessName
            const newJenkinsfileTest = fs.readFileSync(jenkinsfilePath, "utf8");
            if (!newJenkinsfileTest.includes(`def business_name = "${this.programmaticBusinessName}"`)) {
                throw new Error("Jenkinsfile not changed");
            }
            console.log(chalk.green("success ") + "Jenkinsfile successfully changed");

            const backendPromises = []
            backendPromises.push(axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Email"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            }));
            backendPromises.push(axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Business Name"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            }));
            backendPromises.push(axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Web URL"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            }));
            backendPromises.push(axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Bottom Form Endpoint"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            }));
            const responses = await Promise.all(backendPromises);

            const businessEmail = responses[0].data.records[0].fields.Value;
            const businessName = responses[1].data.records[0].fields.Value;
            const webUrl = responses[2].data.records[0].fields.Value;
            const bottomFormEndpoint = responses[3]?.data?.records[0]?.fields?.Value;

            // Change backend .env file with the business email and the DB_NAME with the programmaticBusinessName
            const backendEnvPath = path.join(process.cwd(), "backend", ".env");
            const backendEnv = fs.readFileSync(backendEnvPath, "utf8");
            const newBackendEnv = backendEnv.replace(/FRONT_OFFICE_EMAIL=.*/, `FRONT_OFFICE_EMAIL=${businessEmail}`).replace(/DB_NAME=.*/, `DB_NAME=${this.programmaticBusinessName}`).replace(/DB_USER=.*/, `DB_USER=${this.programmaticBusinessName}`).replace(/BUSINESS_NAME=.*/, `BUSINESS_NAME=${businessName}`).replace(/PRODUCTION_URL=.*/, `PRODUCTION_URL=${webUrl}`).replace(/CUSTOM_BOTTOM_FORM_ENDPOINT=.*/, `CUSTOM_BOTTOM_FORM_ENDPOINT=${bottomFormEndpoint}`);

            fs.writeFileSync(backendEnvPath, newBackendEnv, "utf8");

            // Test and make sure the line is changed and now ends with the businessEmail and with the correct DB_NAME
            const newBackendEnvTest = fs.readFileSync(backendEnvPath, "utf8");
            if (!newBackendEnvTest.includes(`FRONT_OFFICE_EMAIL=${businessEmail}`)) {
                throw new Error("Backend .env FRONT_OFFICE_EMAIL is incorrect");
            }
            if (!newBackendEnvTest.includes(`DB_NAME=${this.programmaticBusinessName}`)) {
                throw new Error("Backend .env DB_NAME is incorrect");
            }
            if (!newBackendEnvTest.includes(`BUSINESS_NAME=${businessName}`)) {
                throw new Error("Backend .env BUSINESS_NAME is incorrect");
            }
            if (!newBackendEnvTest.includes(`PRODUCTION_URL=${webUrl}`)) {
                throw new Error("Backend .env PRODUCTION_URL is incorrect");
            }
            console.log(chalk.green("success ") + "Production URL, Business Name, Email, DB Name and custom endpoint successfully changed in backend .env file");
        } catch (err) {
            console.error(chalk.red("error ") + "Error changing backend ecosystem.config.js");
            console.error(chalk.red("error " + err.message));
            console.error(err.stack);
            process.exit(1);
        }
    }

    async scpEnvFiles() {
        if (!this.programmaticBusinessName) {
            await this.setPrebuildVariables();
        }

        console.log(chalk.blue("info ") + "Programmatic business name: " + this.programmaticBusinessName);

        // const wantsToContinue = await this.constructor.askQuestion("Do you want to continue? (y/n) ");

        // if (!wantsToContinue.toLowerCase().includes("y")) {
        //     console.log(chalk.blue("info ") + "Aborting");
        //     process.exit(0);
        // }

        // console.log(chalk.blue("info ") + "Continuing");

        let ssh;
        try {
            // Connect via scp with private key
            const privateKey = fs.readFileSync(process.env.SSH_KEY_PATH, "utf8");

            ssh = new NodeSSH();

            await ssh.connect({
                host: "server.monarchy.io",
                username: "jenkins",
                privateKey,
            });

            // Check if /var/lib/jenkins/workspace/secrets/${programmaticBusinessName}/ exists
            const existsData = await ssh.execCommand(`test -d /var/lib/jenkins/workspace/secrets/${this.programmaticBusinessName} && echo "exists" || echo "does not exist"`, { cwd: "/var/lib/jenkins/workspace/secrets" });
            const exists = existsData.stdout.trim() === "exists";

            if (!exists) {
                // Create the directory
                await ssh.execCommand(`mkdir ${this.programmaticBusinessName}`, { cwd: "/var/lib/jenkins/workspace/secrets" });
            }

            // If existing .env and .env.production 
            const envExistsData = await ssh.execCommand(`test -f /var/lib/jenkins/workspace/secrets/${this.programmaticBusinessName}/.env && echo "exists" || echo "does not exist"`, { cwd: "/var/lib/jenkins/workspace/secrets" });
            const envExists = envExistsData.stdout.trim() === "exists";

            const envProductionExistsData = await ssh.execCommand(`test -f /var/lib/jenkins/workspace/secrets/${this.programmaticBusinessName}/.env.production && echo "exists" || echo "does not exist"`, { cwd: "/var/lib/jenkins/workspace/secrets" });
            const envProductionExists = envProductionExistsData.stdout.trim() === "exists";

            if (envExists || envProductionExists) {
                // Remove the existing files
                await ssh.execCommand(`rm -f .env`, { cwd: `/var/lib/jenkins/workspace/secrets/${this.programmaticBusinessName}` });
                await ssh.execCommand(`rm -f .env.production`, { cwd: `/var/lib/jenkins/workspace/secrets/${this.programmaticBusinessName}` });
                console.info(chalk.green("success ") + "Removed existing .env and .env.production files");
            }

            // SCP the .env.production and .env file in /var/lib/jenkins/workspace/secrets
            console.log(chalk.blue("info ") + `Uploading .env.production and .env files to /var/lib/jenkins/workspace/secrets/${this.programmaticBusinessName}/`);
            await ssh.putFile(path.join(process.cwd(), ".env.production"), `/var/lib/jenkins/workspace/secrets/${this.programmaticBusinessName}/.env.production`);
            await ssh.putFile(path.join(process.cwd(), "backend", ".env"), `/var/lib/jenkins/workspace/secrets/${this.programmaticBusinessName}/.env`);

            console.log(chalk.green("success ") + "Successfully copied .env files to the server");
        } catch (err) {
            console.error(chalk.red("error ") + "Error scp'ing env files");
            console.error(chalk.red("error " + err.message));
            console.error(err.stack);
            ssh.dispose();
            process.exit(1);
        } finally {
            // close the node-ssh connection
            ssh.dispose();
        }
    }
}

module.exports = GatsbyPrebuilder;