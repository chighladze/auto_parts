const path = require("path");

module.exports = {
  // Оставляем стандартную конфигурацию react-scripts
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      return middlewares;
    },
    port: 8082,
    hot: true,
    historyApiFallback: true,
  },
};
