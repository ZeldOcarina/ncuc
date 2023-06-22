const path = require("path");
const { fetchGatsbyNodeDynamicConfigData, buildLink } = require("./src/helpers/nodeHelpers");

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: "file-loader",
        }
      ],
    },
    experiments: {
      topLevelAwait: true
    }
  })
}

exports.onPreInit = async ({ actions, store, reporter }) => {
  const { setPluginStatus } = actions;
  const state = store.getState();

  const gtmPlugin = state.flattenedPlugins.find(plugin => plugin.name === "gatsby-plugin-google-tagmanager");

  if (gtmPlugin) {
    const GTM_ID = await fetchGatsbyNodeDynamicConfigData({
      baseId: process.env.AIRTABLE_BASE_ID,
      fields: "Value",
      labelColumnName: "Label",
      labelValue: "Google Tag Manager ID",
      supposedStartingValue: "GTM",
      expectedValueName: "GTM ID",
      reporter
    });

    gtmPlugin.pluginOptions = { ...gtmPlugin.pluginOptions, ...{ id: GTM_ID } };
    setPluginStatus({ pluginOptions: gtmPlugin.pluginOptions }, gtmPlugin);
  }
};

exports.createPages = async function ({ actions, graphql, reporter }) {
  // const shortcodes = pageShortcodesData: { pageShortcodesData },


  const { data } = await graphql(`
      query {
        dynamicPagesData: allAirtable(
          filter: {table: {eq: "Sitemap"}, data: {unmapped: {ne: true}}}
        ) {
          dynamicPagesData: nodes {
            data {
              Permalink
              Page_Title
              Form
            }
          }
        }
        
      }
    `)

  const cityState = await fetchGatsbyNodeDynamicConfigData({
    baseId: process.env.AIRTABLE_BASE_ID,
    fields: "Value",
    labelColumnName: "Label",
    labelValue: "City, St",
    supposedStartingValue: "",
    expectedValueName: "City State",
    reporter
  });

  for (const node of data.dynamicPagesData.dynamicPagesData) {
    if (!node.data.Permalink || !node.data.Page_Title) {
      reporter.warn("Page not created because Permalink or Page_Title is not available. Please check your base.");
      return;
    }

    const pageShortcodes = await graphql(`
            query pageShortcodes {
                pageShortcodesData: allAirtable(
                    filter: {
                      table: { eq: "Shortcodes" }
                      data: { Shortcodes: { ne: null }, Category: { eq: "${node.data.Page_Title}" } }
                    }
                  ) {
                    pageShortcodesData: nodes {
                      data {
                        Label
                        Shortcodes
                        Value
                        Category
                      }
                    }
                  }
                  globalShortcodesData: allAirtable(
                    filter: {
                      table: { eq: "Config" }
                      data: { Shortcodes: { ne: null }, Name: { eq: "Details" } }
                    }
                  ) {
                    globalShortcodesData: nodes {
                      data {
                        Label
                        Shortcodes
                        Value
                        Category
                      }
                    }
                  }
            }
        `)

    const { parseShortcodes } = await import(path.join(__dirname, "./src/helpers/parseShortcodes.cjs"));

    const parsedShortcodes = parseShortcodes(pageShortcodes.data.pageShortcodesData.pageShortcodesData, pageShortcodes.data.globalShortcodesData.globalShortcodesData)

    actions.createPage({
      path: buildLink(node.data.Permalink, cityState),
      component: path.resolve(`${__dirname}/src/templates/inner-page-template.jsx`),
      context: {
        pageTitle: node.data.Page_Title,
        permalink: node.data.Permalink,
        offer: node.data.offerHeading,
        form: node.data.Form,
        shortcodes: parsedShortcodes,
      },
    })
  }
}