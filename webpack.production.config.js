var path = require('path')
var webpack = require('webpack');
var babelPreset = ['env', 'react', 'stage-0']
//打包，把dist里内容删了，运行npm run dist
module.exports = {
    entry: './app/pc.js',
    output: {
        filename: '[name].bundle.js',
        path: 'dist',
        publicPath: '/dist/'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                plugins: ['transform-runtime'],//在actions里执行jquery
                presets: babelPreset
            }
        },
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css?modules&localIdentName=[local]_[hash:base64:3]', 'less']
            },
            {
                test: /\.woff(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
            },
            {
                test: /\.otf(\?.*)?$/,
                loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
            },
            {
                test: /\.ttf(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
            },
            {test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]'},
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
            },
            {test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192'}
        ]
    },
    resolve: {
        alias: {
            views: path.join(__dirname, 'views'),
            dist: path.join(__dirname, 'dist'),
            style: path.join(__dirname, 'style'),
            components: path.join(__dirname, 'components'),
            common: path.join(__dirname, 'common'),
            kit: path.join(__dirname, 'kit'),
            actions: path.join(__dirname, "redux/actions"),
            reducers: path.join(__dirname, "redux/reducers"),
            img: path.join(__dirname, "img"),
            font:path.join(__dirname,'font')
        }
    },
    plugins: [
        //压缩代码
        new webpack.optimize.UglifyJsPlugin({minimize:true}),
        //把入口文件vendors数组指定的第三方包打包成verdors.js
        //解决bug--
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify('production')
            }
        }),
        //移除备注和警告
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        })
    ]
}
