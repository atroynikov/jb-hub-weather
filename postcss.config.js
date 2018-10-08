module.exports = ctx => ({
  plugins: [
    require('postcss-import')({}),
    require('postcss-cssnext')({}),
    require('postcss-custom-properties')({
      preserve: true,
      variables: require('@jetbrains/ring-ui/extract-css-vars')
    })
  ]
});
