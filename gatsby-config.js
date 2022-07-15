const siteMetadata = require("./src/content/siteMetadata")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const EXCLUDED_PATHS = []

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-no-sourcemaps`,
    {
      // We need filesystem source plugin to add publicURL function to File nodes
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `placeholder`,
        // path is required param, so let's just point it to single file to not create
        // much unnecessary work for it
        path: `${__dirname}/gatsby-config.js`,
      },
    },
    {
      resolve: "gatsby-source-airtable",
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Config`,
            mapping: { Attachments: `fileNode` },
            tableId: `tblSs9vRUTUExiBFJ`
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Sitemap`,
            tableId: `tblktAY5WS8pRtAMw`,
            mapping: { image: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Menu`,
            mapping: { image: `fileNode` },
            tableId: `tblkYTow9AOeR6N4F`
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Home`,
            mapping: { backgroundImage: `fileNode`, icon: `fileNode`, mediaDrop: `fileNode` },
            tableId: `tblVGK74b5DB5iphC`
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Footer (Global)`,
            tableId: `tblSR7h78XJxd35Uf`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Sports injuries`,
            tableId: `tblHcFSu4lxCoucHH`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Splinting and Braces`,
            tableId: `tblX7WVKszTDF3vDP`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Lacerations and Wound Care`,
            tableId: `tbldyS29lgFFy1vy4`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Incision and Drainage`,
            tableId: `tbl5vJlubqSyT4LmQ`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Minor Burns and Trauma`,
            tableId: `tblOaKNykgDAAGIcv`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Minor Eye Problems`,
            tableId: `tblaW6NZ05CQ5rajj`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Insect Bites`,
            tableId: `tblFY7Z6XzufIth5s`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Viral and Bacterial Infections`,
            tableId: `tblzZD1GGiCoddxtm`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Allergies and Allergic Reactions`,
            tableId: `tblcuIxVa9Hb1cY7b`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Sick Visits`,
            tableId: `tbl36EEOrn5Rboeph`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Rashes`,
            tableId: `tblMj7ok8DM2jg8dJ`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Migraines and Headaches`,
            tableId: `tblX4y75oKi95SecD`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Breathing Treatments for Asthma`,
            tableId: `tblaOhcI3JCS7HQPj`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `STD Testing and Treatment`,
            tableId: `tblwWBfOcaEGsfMEz`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Urinary Tract Infections`,
            tableId: `tblnorAhxLDl7NFFV`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Pregnancy Test`,
            tableId: `tbl9wAdlrpVq18lRh`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Covid Test`,
            tableId: `tblLuyhhGMNQNACl5`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `School Physical Exam`,
            tableId: `tbluioLwr3DEEt1iP`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Annual Physical Exam`,
            tableId: `tbl3SRFDD4CtyUjeh`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Pre-Op Clearance`,
            tableId: `tbla6avMbsQHPjmwM`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Xrays`,
            tableId: `tblZwmS44tBkynut2`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Rapid Antigen Covid Testing`,
            tableId: `tblLZQPPXzVYdQRQu`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Rapid PCR Covid Testing`,
            tableId: `tbl8hDCT1rpDuluIi`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Lab PCR Covid Testing`,
            tableId: `tblvVyxGsOqSbxY5s`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Antibody Covid Testing`,
            tableId: `tblSAdgtFPLOh8P3W`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `About Us`,
            tableId: `tblj2DnqeoxmoyYIV`,
            mapping: { Media: `fileNode` }
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `COVID Locations`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Privacy Policy`,
            tableId: `tbl5fT8x5mxioxD3g`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Terms of Use`,
            tableId: `tblmiZM0FYdZS7iVz`,
          },
        ],
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
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-N569DMM",

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        //dataLayerName: "GTM-NKBGQLK",

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        routeChangeEventName: "gatsby-route-change",
        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
    `gatsby-plugin-react-helmet`,
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#16B0D8`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
