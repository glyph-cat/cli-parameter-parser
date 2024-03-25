import * as debugLib from '../src'
import * as cjsLib from '../lib/cjs/index.js'

export interface TestConfig {
  buildType: 'cjs' | 'es'
  buildEnv: 'debug' | 'dev' | 'prod'
  description: string
  Lib: typeof debugLib
}

const SCOPE = process.env.scope
const DEBUG_BUILDS: Array<TestConfig> = [
  {
    buildEnv: 'debug',
    buildType: 'cjs',
    description: 'Debug',
    Lib: debugLib,
  },
]
const BUNDLED_BUILDS: Array<TestConfig> = [
  {
    buildEnv: 'dev',
    buildType: 'cjs',
    description: 'CJS',
    Lib: cjsLib,
  },
]

const testConfigStack: Array<TestConfig> = []
if (!SCOPE || SCOPE === 'debug') {
  testConfigStack.push(...DEBUG_BUILDS)
}
if (!SCOPE || SCOPE === 'bundled') {
  testConfigStack.push(...BUNDLED_BUILDS)
}

export function wrapper(
  executor: ((cfg: TestConfig) => void)
): void {
  for (const testConfig of testConfigStack) {
    describe(testConfig.description, (): void => {
      executor(testConfig)
    })
  }
}
