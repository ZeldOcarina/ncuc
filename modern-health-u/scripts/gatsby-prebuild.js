async function main() {
    const gatsbyPrebuilderImport = await import("@zeldocarina/gatsby-helpers/GatsbyPrebuilder.js");
    const GatsbyPrebuilder = gatsbyPrebuilderImport.default;
    await new GatsbyPrebuilder({
        project: "waves",
        config: "waves_ncuc"
    }).prebuild();
}

main();
