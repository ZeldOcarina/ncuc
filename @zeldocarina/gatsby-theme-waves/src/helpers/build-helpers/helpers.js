exports.createMapping = (category) => {
    switch (category) {
        case "Config":
            return { File: `fileNode` }
        case "Menu":
            return { logo: `fileNode`, Media: `fileNode` }
        case "Blog":
            return { mainImage: `fileNode`, thumbnail: `fileNode` }
        default:
            return { Media: `fileNode` }
    }
}