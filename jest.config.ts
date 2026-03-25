require('ts-node').register();
import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
}

export default config