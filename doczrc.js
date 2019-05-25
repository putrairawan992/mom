export default {
  title: 'MOM',
  modifyBundlerConfig: (config) => {
    config.resolve.extensions.push('.sass')
    config.resolve.extensions.push('.css')
    config.module.rules.push({
      test: /\.sass$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    })
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    })
    return config
  }
}