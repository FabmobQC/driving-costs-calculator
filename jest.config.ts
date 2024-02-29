import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/**/__tests__/**/*.test.ts'
  ],
  
  moduleNameMapper: {
    '^(.+)\.js$': '$1',
  }  
}

export default config
