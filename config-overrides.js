const { override, fixBabelImports, addLessLoader, addWebpackModuleRule } = require('customize-cra');
const path = require('path');
const fs  = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/ant-theme-vars.less'), 'utf8'));

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
 addLessLoader({
   javascriptEnabled: true,
   modifyVars: themeVariables
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

// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: true,
//   }),
//  addLessLoader({
//    javascriptEnabled: true,
//    modifyVars: { 
//     '@primary-color': '#007E80',
//     '@error-color' : '#A8071A'
//   },
//  }),
//  addWebpackModuleRule({
//     test: /\.sass$/,
//     use: [
//       {
//         loader: 'sass-resources-loader',
//         options: {
//           resources: './src/sass/variable.sass'
//         },
//       },
//     ],
//  })
// );