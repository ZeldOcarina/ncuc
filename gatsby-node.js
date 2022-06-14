exports.onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: "file-loader"
                }
            ]
        }
    })
}