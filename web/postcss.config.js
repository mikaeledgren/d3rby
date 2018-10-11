module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-preset-env')({
      stage: 3,
    }),
    require('postcss-import'),
    require('postcss-css-variables'),
    require('postcss-color-function'),
    require('autoprefixer')
  ]
};