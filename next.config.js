var path = require('path')

module.exports = {
  basePath: '/static-nextjs',
  assetPrefix: '/static-nextjs/',
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'node_modules')],
  // },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}

// var path = require('path')
// const withSass = require('@zeit/next-sass')

// module.exports = withSass({
//   // sassOptions: {
//   //   includePaths: [path.join(__dirname, 'node_modules')],
//   // },
//   webpack: function (config) {
//     config.module.rules.push({
//       test: /\.md$/,
//       use: 'raw-loader',
//     })
//     return config
//   },
// })
