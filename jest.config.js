// jest.config.js
module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  
    // The root directory that Jest should scan for tests and modules within
    roots: ['<rootDir>/'],
  
    // A list of paths to modules that run some code to configure or set up the testing environment
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
    // The test environment that will be used for testing
    testEnvironment: 'jsdom',
  
    // Transform settings to handle different file types
    transform: {
      // Use `babel-jest` for JavaScript/TypeScript files
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  
    // Module file extensions for importing
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  
    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
    // A map from regular expressions to paths to transformers
    transform: {
      // Use `babel-jest` to transform JavaScript/TypeScript files
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  
    // Coverage reporting
    collectCoverage: true,
    collectCoverageFrom: [
      'pages/**/*.{js,jsx,ts,tsx}',
      'components/**/*.{js,jsx,ts,tsx}',
      '!**/node_modules/**',
      '!**/.next/**',
    ],
  
    // Custom module name mapping to handle assets (e.g., images, styles)
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    },
  };