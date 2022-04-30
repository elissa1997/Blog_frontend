module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }, 'antvue'], // `style: true` 会加载 less 文件
    ["prismjs", { "languages": ["javascript", "css", "json", "py", "c", "nginx", "php"], "plugins": ["line-numbers"], "theme": "okaidia", "css": true }]
  ]
}
