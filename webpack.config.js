module.exports = {
  webpack: function(config, dev) {
    config.module.rules.push(
        {
          test: /\.sass$/,
          use: [
            {
              loader: 'sass-resources-loader',
              options: {
                resources: './src/sass/variable.sass'
              },
            },
          ],
        },
    )
    return config;    
  },
}
