module.exports = {
  'root': true,
  'env': {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    'google'
  ],
  'rules': {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [0],
    'max-len': ['error', { 'code': 150 }]
  },
  'parserOptions': {
    parser: 'babel-eslint'
  }
}
