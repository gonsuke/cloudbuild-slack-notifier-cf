module.exports = {
  "env": {
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "no-unused-vars": "off",
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        printWidth: 200
      }
    ]
  }
}
