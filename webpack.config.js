import path, { join, normalize } from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { fileURLToPath } from "url";
import Dotenv from "dotenv-webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";
const IS_SERVE = process.env.WEBPACK_SERVE ?? false;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATH_ENTRY = join(__dirname, "src/app", "index.tsx");
const PATH_TEMPLATE_ENTRY = join(__dirname, "public", "index.html");
const PATH_PUBLIC_FOLDER = join(__dirname, "public");
const PATH_OUTPUT_FOLDER = join(__dirname, "build");

export default () => {
  const config = {
    mode: IS_DEVELOPMENT ? "development" : "production",
    devtool: IS_DEVELOPMENT ? "source-map" : undefined,
    entry: PATH_ENTRY,
    output: {
      path: PATH_OUTPUT_FOLDER,
      filename: "[name].[fullhash:8].js",
      chunkFilename: "[name].[chunkhash:8].js",
      publicPath: "auto",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".sass"],
      fallback: { process: false },
      plugins: [new TsconfigPathsPlugin()],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@mui/styled-engine": "@mui/styled-engine-sc",
      },

      modules: [__dirname, "node_modules"],
    },
    devServer: {
      hot: true,
      open: true,
      compress: true,
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: ["ts-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.s?[ca]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|webp|ico)$/i,
          type: "asset/resource",
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: PATH_TEMPLATE_ENTRY,
        filename: "index.html?[fullhash:8]",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[fullhash:8].css",
        chunkFilename: "[name].[chunkhash:8].css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: PATH_PUBLIC_FOLDER,
            filter: (filepath) => {
              switch (
                normalize(filepath).substring(PATH_PUBLIC_FOLDER.length + 1)
              ) {
                case "index.html":
                  return false;
                default:
                  return true;
              }
            },
          },
        ],
      }),
    ],
  };

  if (IS_DEVELOPMENT && IS_SERVE) {
    config.plugins.push(new ReactRefreshWebpackPlugin());
    config.module.rules[0].use[0] = {
      loader: "ts-loader",
      options: {
        getCustomTransformers: () => ({
          before: [ReactRefreshTypeScript()],
        }),
        transpileOnly: true,
      },
    };
  }

  return config;
};
