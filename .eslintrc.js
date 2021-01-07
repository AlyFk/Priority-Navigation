module.exports = {
  text: sourceCode,
  eslintConfig: {
    parserOptions: {
      ecmaVersion: 7,
    },
    rules: {
      semi: ['error', 'never'],
    },
  },
  prettierOptions: {
    bracketSpacing: true,
  },
  fallbackPrettierOptions: {
    singleQuote: false,
  },
};
