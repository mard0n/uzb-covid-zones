const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

// const enableBundleAnalyzer = true;
const enableBundleAnalyzer = process.env.ENABLE_ANALYZER === "true";
const pathToIndexHtml = path.resolve(__dirname, "public", "index.html")

module.exports = {
  entry: [path.resolve(__dirname, "src", "index.tsx")],
  mode: "production",
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: pathToIndexHtml,
    }),
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new ManifestPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: enableBundleAnalyzer === true ? "static" : "disabled",
      openAnalyzer: true,
    }),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|uz/),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public', 'translations'), to: 'translations/'}
      ],
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
        exclude: [/node_modules/],
        // outputPath: "static/js/",
      },
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
        exclude: [/node_modules/],
        // outputPath: "static/js/",
      },
      {
        test: /\.css$/,
        // include: path.resolve(__dirname, "./node_modules"),
        use: [
          // { loader: MiniCssExtractPlugin.loader },
          { loader: 'styles-loader' },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "static/images/",
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[contenthash].[ext]",
          },
        },
        // outputPath: "fonts/",
      },
      // {
      //   test: /\.json$/,
      //   loader: "json-loader",
      //   exclude: [/node_modules/]
      // },
      // {
      //   test: /\.html/,
      //   use: ["html-loader"],
      // },
      // {
      //   test: pathToIndexHtml,
      //   use: [
      //     "file-loader",
      //     "extract-loader",
      //     {
      //       loader: "html-loader",
      //       // options: {
      //       //   attributes: {
      //       //     list: [
      //       //       {
      //       //         // Tag name
      //       //         tag: "link",
      //       //         // Attribute name
      //       //         attribute: "href",
      //       //         // Type of processing, can be `src` or `scrset`
      //       //         type: "src",
      //       //       }
      //       //     ],
      //       //   },
      //       // },
      //     },
      //   ],
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     "file-loader",
      //     "extract-loader",
      //     {
      //       loader: "css-loader",
      //       // options: {
      //       //   sourceMap: true,
      //       // },
      //     },
      //   ],
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       // loader: MiniCssExtractPlugin.loader,
      //       loader: 'file-loader',
      //       // options: {
      //       //   publicPath: path.resolve(__dirname, "dist", "static", "css"),
      //       //   // options: {
      //       //   //   esModule: true,
      //       //   // },
      //       // },
      //     },
      //     'extract-loader',
      //     {
      //       loader: "css-loader",
      //       // options: {
      //       //   modules: true,
      //       // },
      //     },
      //   ],
      // },
      // {
      //   test: pathToIndexHtml,
      //   use: [
      //     "file-loader",
      //     "extract-loader",
      //     {
      //       loader: "html-loader",
      //       // options: {
      //       //   attributes: {
      //       //     list: [
      //       //       {
      //       //         // Tag name
      //       //         tag: "link",
      //       //         // Attribute name
      //       //         attribute: "href",
      //       //         // Type of processing, can be `src` or `scrset`
      //       //         type: "src",
      //       //       },
      //       //     ],
      //       //   },
      //       // },
      //     },
      //   ],
      // },
    ],
  },
};
