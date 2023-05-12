module.exports = {
    preset: 'react-native',
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/index.js',
    ],
  };