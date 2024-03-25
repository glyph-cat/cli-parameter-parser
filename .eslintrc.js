const { configs } = require('@glyph-cat/eslint-config')

const strictConfigs = configs.strict

const OFF = 0
// const WARN = 1
// const ERROR = 2

module.exports = {
  root: true,
  ...strictConfigs,
  extends: [
    ...strictConfigs.extends.filter((r) => !/react/gi.test(r)),
    'plugin:jest/recommended',
  ],
  plugins: [
    ...strictConfigs.plugins,
    'jest',
  ],
  rules: (() => {
    const rules = {}
    for (const rule in strictConfigs.rules) {
      if (!/^react\//.test(rule)) {
        rules[rule] = strictConfigs.rules[rule]
      }
    }
    return {
      ...rules,
      '@typescript-eslint/no-explicit-any': OFF,
      'jest/valid-title': OFF,
    }
  })(),
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
        // Reference: https://stackoverflow.com/a/75368733/5810737
      },
    },
    jest: {
      version: require('jest/package.json').version,
    },
  },
}
