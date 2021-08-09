module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/app/javascript'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/config/testing-library/setup.js'],
  moduleNameMapper: {
    '@api(.*)$': '<rootDir>/app/javascript/api$1',
    '@hooks(.*)$': '<rootDir>/app/javascript/hooks$1',
  },
};
