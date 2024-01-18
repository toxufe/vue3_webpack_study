const { Configuration } = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
/**
 * @type {Configuration} //配置智能提示
 */
const config = {
    mode: "development",
    entry: './src/main.ts', //入口文件
    output: {
        filename: "[fullhash].js",
        path: path.resolve(__dirname, 'dist') //出口文件
    },
    module: {
        rules: [
            {
                test: /\.vue$/, //解析vue 模板
                use: "vue-loader"
            },
            {
                test: /\.less$/, //解析 less
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.css$/, //解析css
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.ts$/,  //解析ts
                loader: "ts-loader",
                options: {
                    configFile: path.resolve(process.cwd(), 'tsconfig.json'),
                    appendTsSuffixTo: [/\.vue$/]
                },
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./public/index.html" //html模板
        }),
        new CleanWebpackPlugin(), //打包清空dist
        new VueLoaderPlugin(), //解析vue
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo:{ //美化样式
                messages:['You application is running here http://localhost:9001']
            }
           
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src') // 别名
        },
        extensions: ['.js', '.json', '.vue', '.ts', '.tsx'] //识别后缀
    },
    stats:"errors-only", //取消提示
    devServer: {
        proxy: {},
        port: 9001,
        hot: true,
        open: true,
    },
    externals: {
        // vue: "Vue" //CDN 引入
    },
}
 
 
module.exports = config