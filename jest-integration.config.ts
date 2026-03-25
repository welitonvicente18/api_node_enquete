import baseConfig from './jest.config'

const config = {
  ...baseConfig,
  testMatch: ['**/*.test.ts']
}

export default config