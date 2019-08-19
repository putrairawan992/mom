const path = require('path');
const fs  = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/antd-config/antdThemeVars.less'), 'utf8'));

export default {
  title: 'MOM',
  modifyBundlerConfig: (config) => {
    config.resolve.extensions.push('.sass')
    config.resolve.extensions.push('.css')
    config.module.rules.push({
      test: /\.sass$/,
      use: [
        "style-loader", "css-loader", "sass-loader",
        {
          loader: 'sass-resources-loader',
          options: {
            resources: './src/sass/variable.sass'
          },
        } 
      ]
    })
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    })
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader', 'css-loader',
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true,
            modifyVars: themeVariables
          }
        }
      ]
    })
    return config
  },
  notUseSpecifiers: true,
  filterComponents: files => files.filter(filepath => /w*.(js|jsx|ts|tsx)$/.test(filepath))
}