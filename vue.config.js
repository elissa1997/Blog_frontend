module.exports = {
  devServer: {
    port: 9010,
    proxy: {
      '/bingProxy': {
        target:  'https://cn.bing.com/' ,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
        '^/bingProxy': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        prependData: `@import "~@/assets/style/public.sass";`
      },
      scss: {
        additionalData: `@import "~@/assets/style/public.scss";`
      },
      // @/ 是 src/ 的别名
      // 所以这里假设你有 `src/variables.sass` 这个文件
      // 注意：在 sass-loader v7 中，这个选项名是 "data"
      
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
    }
  }
}