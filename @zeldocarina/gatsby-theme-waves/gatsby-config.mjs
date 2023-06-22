import fs from "fs";
import path, { dirname } from "path";
import { createRequire } from "module"
import { fileURLToPath } from "url"

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

// Read file config/airtable-tables.json and read the JSON content from the file
const airtableTablesPath = path.join(process.cwd(), "config", "airtable-tables.json");
const airtableTables = JSON.parse(fs.readFileSync(airtableTablesPath, "utf8"));

const EXCLUDED_PATHS = []

const config = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    `gatsby-plugin-no-sourcemaps`,
    {
      // We need filesystem source plugin to add publicURL function to File nodes
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `placeholder`,
        // path is required param, so let's just point it to single file to not create
        // much unnecessary work for it
        path: path.resolve(`${__dirname}/gatsby-config.mjs`),
        ignore: [`**/\.*`] // ignore files starting with a dot
      },
    },
    {
      resolve: "gatsby-source-airtable",
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: airtableTables,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [
          { userAgent: "Googlebot", allow: "*", disallow: EXCLUDED_PATHS },
          {
            userAgent: "msnbot|BingBot",
            allow: "/",
            disallow: EXCLUDED_PATHS,
          },
          {
            userAgent: "DuckDuckBot",
            allow: "/",
            disallow: EXCLUDED_PATHS,
          },
          {
            userAgent: "*",
            disallow: "*",
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: EXCLUDED_PATHS,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "{{ GTM_ID }}",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        routeChangeEventName: "gatsby-route-change",
        enableWebVitalsTracking: true,
      },
    }
  ],
}

export default config