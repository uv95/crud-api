module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testMatch: ['**/?(*.)+(test).ts'],
  resetMocks: true,
  restoreMocks: true,
};
