import { Config } from 'jest'

const config: Config = {
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // moduleDirectories: [
  //   'node_modules',
  //   'src',
  // ],
  // setupFiles: [
  //   '<rootDir>/jest.setup.ts',
  // ],
  testRegex: '.test.(tsx|ts|jsx|js)',
  testPathIgnorePatterns: [
    '.draft',
    '.old',
  ],
}

export default config
