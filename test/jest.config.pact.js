const TEST_TYPE = 'pact'

const babelConfig = {
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-modules-commonjs'
  ]
}

module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': { babelConfig },
    'vue-jest': { babelConfig }
  },
  rootDir: '../',
  testTimeout: 10000,
  coverageDirectory: `.coverage/${TEST_TYPE}`,
  testMatch: [
    `<rootDir>/test/${TEST_TYPE}/**/*.test.ts`
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'js', 'ts', 'json', 'vue'
  ],
  setupFiles: [
    '<rootDir>/test/setup.ts'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue',
    '<rootDir>/src/layouts/**/*.vue'
 ]
}
