const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: slsw.lib.entries,

    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',

    // External Packages Bundling Instructions
    externalsPresets: {node: true},
    externals: [
        // nodeExternals({
        //     allowlist: ['@prisma/client', 'openai']
        // })
    ],

    optimization: {
        minimize: false,
    },
    performance: {
        hints: false,
    },
    devtool: 'nosources-source-map',
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './node_modules/.prisma/client/schema.prisma', to: './'},
                {
                    from: "./node_modules/.prisma/client/*",
                    to({context, absoluteFilename}) {
                        return "./.prisma/client/[name][ext]";
                    },
                    globOptions: {
                        ignore: ["**/libquery_engine-darwin-arm64.dylib.node"],
                    },
                }
            ],
        }),

    ],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.mjs$/,
                type: 'javascript/auto',
            },
        ],
    },
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
    },
};