const { override, fixBabelImports, addLessLoader, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
 addLessLoader({
   javascriptEnabled: true,
   modifyVars: { 
    '@primary-color': '#007E80',
    '@error-color' : '#A8071A'
  },
 }),
 addWebpackModuleRule({
    test: /\.sass$/,
    use: [
      {
        loader: 'sass-resources-loader',
        options: {
          resources: './src/sass/variable.sass'
        },
      },
    ],
 })
);