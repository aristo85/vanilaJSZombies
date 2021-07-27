const path = require("path");

module.exports = {
  entry: "./src/index.ts",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  output: {
    publicPath: "/public/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },

  devServer: {
    open: true,
    overlay: true,
    contentBase: "./public/",
    watchOptions: {
      poll: true,
      ignored: "/node_modules/",
    },
  },
};
