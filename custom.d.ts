declare namespace NodeJS {

  // NOTE: These are actually not needed for now
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test'
    VERSION: string
    BUILD_HASH: string
  }

}
