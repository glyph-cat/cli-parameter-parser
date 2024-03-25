import { argPatternGenerator } from './arg-pattern-generator'

/**
 * @public
 */
export class ParameterParser {

  /**
   * @internal
   */
  private __usedParameterIndexes: Record<number, true> = {}

  /**
   * @internal
   */
  private readonly __parameters: Array<string>

  constructor(parameters: Array<string>) {
    this.__parameters = parameters
  }

  getOne(alias: string | null, name: string): string {
    const pattern = argPatternGenerator(alias, name)
    for (let i = 0; i < this.__parameters.length; i++) {
      if (pattern.test(this.__parameters[i])) {
        this.__usedParameterIndexes[i] = true
        this.__usedParameterIndexes[i + 1] = true
        return this.__parameters[i + 1] ?? null
      }
    }
    return null
  }

  getBoolean(alias: string | null, name: string): boolean {
    const pattern = argPatternGenerator(alias, name)
    for (let i = 0; i < this.__parameters.length; i++) {
      if (pattern.test(this.__parameters[i])) {
        // Boolean parameters are automatically true if specified without a trailing value.
        // But if a trailing value is specified, then it must not have leading slashes
        // in order for it to be recognized.
        this.__usedParameterIndexes[i] = true
        if (
          typeof this.__parameters[i + 1] === 'string' &&
          !/^-/.test(this.__parameters[i + 1])
        ) {
          this.__usedParameterIndexes[i + 1] = true
          return /^(1|true|t|yes|y)$/i.test(this.__parameters[i + 1])
        }
        return true
      }
    }
    return false
  }

  getAll(alias: string | null, name: string): Array<string> {
    const pattern = argPatternGenerator(alias, name)
    const collectedValues: Array<string> = []
    for (let i = 0; i < this.__parameters.length; i++) {
      if (pattern.test(this.__parameters[i])) {
        this.__usedParameterIndexes[i] = true
        let offset = 1
        // While following items do not have leading dash, we treat it as a value
        while (
          ((i + offset) < this.__parameters.length) &&
          (!/^-/.test(this.__parameters[i + offset]))
        ) {
          this.__usedParameterIndexes[i + offset] = true
          collectedValues.push(this.__parameters[i + offset] ?? null)
          offset += 1
        }
        i += offset - 1
      }
    }
    return collectedValues
  }

  getTrailing(alias: string | null, name: string): Array<string> {
    const pattern = argPatternGenerator(alias, name)
    for (let i = 0; i < this.__parameters.length; i++) {
      if (pattern.test(this.__parameters[i])) {
        this.__usedParameterIndexes[i] = true
        const sliced = this.__parameters.slice(i + 1) as Array<string>
        for (let j = 0; j < sliced.length; j++) {
          this.__usedParameterIndexes[i + 1 + j] = true
        }
        return sliced
      }
    }
    return []
  }

  getRemaining(): Array<string> {
    const remainingParameters: Array<string> = []
    for (let i = 0; i < this.__parameters.length; i++) {
      if (!this.__usedParameterIndexes[i]) {
        remainingParameters.push(this.__parameters[i])
      }
    }
    return remainingParameters
  }

}
