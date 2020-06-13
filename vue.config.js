module.exports = {
  //   chainWebpack: config => {
  //     config.resolve.alias.set('assets',resolve('@assets'))
  //   }
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

