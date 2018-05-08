const path = require('path')
const baseBabelPlugin = [
  'transform-runtime',
  'transform-decorators-legacy',
  ["module-resolver", {
    "alias": {
      "components": "./src/components",
      "config": "./src/config",
      "images": "./src/images",
      "routes": "./src/routes",
      "utils": "./src/utils"
    }
  }]
]

/**
 * roadhog config
 * more options please see https://github.com/sorrycc/roadhog
 * make webpack config easily, it is also stand 'webpack.config.js'
 */
export default {
  'entry': 'src/index.js',
  'disableCSSModules': true,
  'hash': true,
  'autoprefixer': {
    'browsers': [
      'iOS >= 8', 'Android >= 4', 'IE>=10'
    ]
  },
  "ignoreMomentLocale": true,
  'env': {
    'development': {
      'extraBabelPlugins': baseBabelPlugin.concat('dva-hmr'),
    },
    'production': {
      // 'publicPath': '',
      'extraBabelPlugins': baseBabelPlugin
    }
  },
  publicPath: 'http://p2hfdzdsp.bkt.clouddn.com/fe'
}
