module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', 
    'plugin:react-hooks/recommended',
    "react-app/jest"
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "jsx-a11y/no-access-key": "off"
  },
};
