module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/app/javascript'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
