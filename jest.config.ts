import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/**/__tests__/**/*.test.ts'
  ]
}

export default config
