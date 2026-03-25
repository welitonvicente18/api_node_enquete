require('ts-node').register();
import baseConfig from './jest.config'

const config = {
  ...baseConfig,
  testMatch: ['**/*.spec.ts']
}

export default config