import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({ Lib: { ParameterParser } }: TestConfig) => {

  test('Empty array', () => {
    const parameters = new ParameterParser([])
    const output = parameters.getBoolean('a', 'anything')
    expect(output).toBe(false)
  })

  test('Not specified', () => {
    const parameters = new ParameterParser(['-b', 'abc'])
    const output = parameters.getBoolean('a', 'anything')
    expect(output).toBe(false)
  })

  describe('Flag only', () => {

    test('Using alias', () => {
      const parameters = new ParameterParser(['-a', '-x', '...'])
      const output = parameters.getBoolean('a', 'anything')
      expect(output).toBe(true)
    })

    test('Using name', () => {
      const parameters = new ParameterParser(['--anything', '-x', '...'])
      const output = parameters.getBoolean('a', 'anything')
      expect(output).toBe(true)
    })

  })

  describe('Flag: Truthy', () => {

    test('Using alias', () => {
      const parameters = new ParameterParser(['-a', 'true', '-x', '...'])
      const output = parameters.getBoolean('a', 'anything')
      expect(output).toBe(true)
    })

    test('Using name', () => {
      const parameters = new ParameterParser(['--anything', 'true', '-x', '...'])
      const output = parameters.getBoolean('a', 'anything')
      expect(output).toBe(true)
    })

    describe('Other truthy values', () => {

      test('`t`', () => {
        const parameters = new ParameterParser(['--anything', 't', '-x', '...'])
        const output = parameters.getBoolean('a', 'anything')
        expect(output).toBe(true)
      })

      test('`1`', () => {
        const parameters = new ParameterParser(['--anything', '1', '-x', '...'])
        const output = parameters.getBoolean('a', 'anything')
        expect(output).toBe(true)
      })

      test('`y`', () => {
        const parameters = new ParameterParser(['--anything', 'y', '-x', '...'])
        const output = parameters.getBoolean('a', 'anything')
        expect(output).toBe(true)
      })

      test('`yes`', () => {
        const parameters = new ParameterParser(['--anything', 'yes', '-x', '...'])
        const output = parameters.getBoolean('a', 'anything')
        expect(output).toBe(true)
      })

    })

  })

  describe('Flag Falsy', () => {

    // Basically any values outside of the truthy values will be treated as false
    // But these "falsy" values below are the intended usage so we should at least test them.
    // Also, to reduce complexity, the '-a' and '--anything' usage patterns are mixed below.

    // Also note that we want to make sure if there are other parameters behind the flag,
    // then it should ignore them and not treat the value as false. This should be done
    // by checking if the next string contains a leading dash.

    test('`n`', () => {
      const parameters = new ParameterParser(['--a', 'n', '-x', '...'])
      const output = parameters.getBoolean('a', 'anything')
      expect(output).toBe(false)
    })

    test('`no`', () => {
      const parameters = new ParameterParser(['--anything', 'no', '-x', '...'])
      const output = parameters.getBoolean('a', 'anything')
      expect(output).toBe(false)
    })

    test('`f`', () => {
      const parameters = new ParameterParser(['--a', 'f', '-x', '...'])
      const output = parameters.getBoolean('a', 'anything')
      expect(output).toBe(false)
    })

    test('`false`', () => {
      const parameters = new ParameterParser(['--anything', 'false', '-x', '...'])
      const output = parameters.getBoolean('a', 'anything')
      expect(output).toBe(false)
    })

    test('`0`', () => {
      const parameters = new ParameterParser(['--a', '0', '-x', '...'])
      const output = parameters.getBoolean('a', 'anything')
      expect(output).toBe(false)
    })

  })

})
