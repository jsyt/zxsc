const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require('ts-import-plugin')
const webpack = require("webpack");
const path = require('path');


module.exports = {
  mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: {
      index: './index.html'
    }
  },
  resolve: {
    alias: {
        "@": path.resolve(__dirname, 'src'),
        "~": path.resolve(__dirname, 'node_modules')
    },
    //当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
    extensions: ['.ts', '.tsx', '.js', '.json']
},
  module: {
    rules: [
      {
        test: /(j|t)sx?/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true, // 只转译 不检查
          getCustomTransformers: () => ({ // 获取自定义转换器
            before: [tsImportPluginFactory({
              "libraryName": 'antd',  // 对哪个模块进行按需加载
              "libraryDirectory": "es", // 按需加载的模块必须是 Es Module
              "style": "css"
            })]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        }
      },
      {
        test: /\.(j|t)sx?$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 0 }
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: [
          //       require('autoprefixer')
          //     ]
          //   }
          // }, {
          //   loader: 'px2rem-loader',
          //   options: {
          //     remUnit: 75,
          //     remPrecesion: 8
          //   }
          // }
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', {
            loader: 'css-loader',
            options: { importLoaders: 0 }
        },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecesion: 8
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}