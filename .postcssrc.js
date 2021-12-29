module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue ({ file }) {
          // file => 要编译的样式的路径
          return file.includes('vant') ? 37.5 : 75   // 设计稿为750  vant的设计稿为350
        },
        // * 号代表把所有的属性 px 转 rem
        propList: ['*']
      }
    }
}
