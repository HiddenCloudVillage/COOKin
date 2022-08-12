const path = require('path');
// at the top add this new import
const ESLintPlugin = require('eslint-webpack-plugin');
// inside the exports add a new field labels plugins

module.exports = {
  mode: 'development',
  entry: './client/src/index.jsx',
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  // [devtool] this is an additional source map that will
  //  let the browser know what files are running our code.
  // Helps with error tracing. Without it we will not know
  //  where our errors are coming from because it will state
  //  that everything inside the bundle file.
  devtool: 'eval-cheap-module-source-map',
  // [devServer] configuration for the live server including port
  devServer: {
    // [static] config for how what to serve
    static: {
      directory: path.join(__dirname, 'client/dist'),
    },
    compress: true,
    // [port] what port on our local machine to run the dev server
    port: 3001,
  },

  plugins: [new ESLintPlugin()],
  resolve: {
    extensions: [
      '.js', '.json', '.jsx',
    ],
  },
};
