const { recommended } = require('@glyph-cat/eslint-config')

// const OFF = 0
// const WARN = 1
// const ERROR = 2

module.exports = {
  root: true,
  ...recommended,
  extends: recommended.extends, // TODO: Filter react extensions
  rules: {
    // TODO: Filter 'react' rules
    ...recommended.rules,
  },
}
