module.exports = function (env) {
  console.log(env);

  return {
    entry: {
      'demo/index': './demo/_index.js',
    },
    output: {
      path: __dirname,
      filename: '[name].js',
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: false,
      inline: false,
      hot: false,
      host: '0.0.0.0',
      port: 8080,
    },
    module: {
      loaders: [
        {
          test: /\.test.js$/,
          exclude: /node_modules/,
          loader: require.resolve('mocha-loader'),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          query: {
            babelrc: false,
            // plugins: [
            //   require.resolve('babel-plugin-transform-async-to-generator'),
            // ],
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-stage-3'),
            ],
            cacheDirectory: true,
          },
        },
        {
          test: /\.css$/,
          loader: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: require.resolve('url-loader'),
          query: {
            limit: 1000,
            name: './img/[name].[ext]',
          },
        },
      ],
    },
  };
};
