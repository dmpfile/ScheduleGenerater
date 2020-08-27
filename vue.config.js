module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": "/Users/nakuiryosuke/Program/schedule-generater/src",
      },
    },
  },
  devServer: {
    open: true,
  },
  transpileDependencies: ["vuetify"],
};
