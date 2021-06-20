module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://yuforms.localhost:80',
        changeOrigin: true
      },
    }
  }
}
