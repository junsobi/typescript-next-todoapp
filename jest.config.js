module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  watchPathIgnorePatterns: ['<rootDir>/playwright-tests'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '.next/',
    '.spec.test.',
    'playwright-tests',
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
};
