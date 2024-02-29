import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/**/__tests__/**/*.test.ts'
  ],

  moduleNameMapper: {
    // eslint-disable-next-line no-useless-escape -- '.' has to be escaped for the regex
    '^(.+)\.js$': '$1'
  }
}

export default config
