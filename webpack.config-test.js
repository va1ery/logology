/*
// we want globalize to use imports-loader so it doesn't freak out
webpackConfig.module.rules.push({ test: /globalize/, loader: "imports-loader?define=>false" });
*/

// from https://github.com/istanbuljs/nyc/issues/176#issuecomment-286738545

var path = require("path");
var coverage = process.env.NODE_ENV === "cover";

module.exports = {
    context: path.resolve("test"),
    target: "node",
    externals: require("webpack-node-externals")(),
/*    output: {
        devtoolModuleFilenameTemplate: "[absolute-resource-path",
        devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]"
    },*/
    devtool: "inline-source-map",
    resolve: {
        extensions: [
            ".js", ".jsx",
            ".ts", ".tsx"
        ],
        modules: [
            "node_modules"
        ]
    },
    module: {
        rules: [{
            test: /\.(j|t)sx?/,
            exclude: /node_modules/,
            rules: [{
                test: () => coverage,
                enforce: "post",
                loader: "istanbul-instrumenter-loader?esModules"
            }, {
                loader: "ts-loader",
                options: {
                    entryFileIsJs: true,
                    //configFileName: "tsconfig.json"
                }
            }]
        }]
    }
};