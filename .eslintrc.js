module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  "parser": "babel-eslint",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      "experimentalObjectRestSpread": true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react'
  ],
  rules: {
    "semi": [2, "always"],
    "react/jsx-uses-react": "error",   
    "react/jsx-uses-vars":"error",
    "eol-last": 0
  }
 
}
