module.exports = {
  // publicPath:process.env.NODE_ENV === 'production'?'./':'/',
  // baseUrl:'/',
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
