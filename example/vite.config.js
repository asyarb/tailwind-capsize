const preactRefresh = require('@prefresh/vite')

const config = {
  jsx: 'preact',
  plugins: [preactRefresh()],
}

module.exports = config
