module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': '@/assets',
        '@common': '@/common',
        '@com': '@/components',
        '@network': '@/network',
        '@views': '@/views',
      }
    }
  }
}
