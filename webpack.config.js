var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
    entry: {
        index: "./app/javascript/index.js",
        about: "./app/javascript/about.js",
    },
    output: {
        // options related to how webpack emits results
        path: path.resolve(__dirname, "dist"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: "[name].bundle.[hash].js"
    },

    module: {

        rules: [
            // rules for modules (configure loaders, parser options, etc.)

            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: /node_modules/,
                loader: "babel-loader",
                // the loader which should be applied, it'll be resolved relative to the context
                // -loader suffix is no longer optional in webpack2 for clarity reasons
                // see webpack 1 upgrade guide

                options: {
                    presets: ["es2015"]
                }
                // options for the loadernpm
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {importLoaders: 1}
                        },
                        {loader: 'postcss-loader'}
                    ]
                })
            },

            {
                test: /\.html$/,
                loader: "html-loader"
            },

            {
                test: /\.(jpg|png|woff|woff2)$/,
                loader: "file-loader"
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].bundle.[hash].css'),
        new HtmlWebpackPlugin({
            template: './app/templates/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './app/templates/about.html',
            filename: 'about.html',
            chunks: ['about']
        }),

    ],
    devServer: {
        hot: true,
        inline: true
    }

};
