import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({ Lib: { ParameterParser } }: TestConfig) => {

  test('Empty array', () => {
    const parameters = new ParameterParser([])
    const output = parameters.getTrailing('a', 'anything')
    expect(output).toStrictEqual([])
  })

  test('Not specified', () => {
    const parameters = new ParameterParser(['-b', 'abc'])
    const output = parameters.getTrailing('a', 'anything')
    expect(output).toStrictEqual([])
  })

  describe('Using alias', () => {

    test('Only flag, no value', () => {
      const parameters = new ParameterParser(['-a'])
      const output = parameters.getTrailing('a', 'anything')
      expect(output).toStrictEqual([])
    })

    test('Happy Path', () => {
      const parameters = new ParameterParser(['-a', 'foo', 'bar', 'baz'])
      const output = parameters.getTrailing('a', 'anything')
      expect(output).toStrictEqual(['foo', 'bar', 'baz'])
    })

  })

  describe('Using name', () => {

    test('Only flag, no value', () => {
      const parameters = new ParameterParser(['--anything'])
      const output = parameters.getTrailing('a', 'anything')
      expect(output).toStrictEqual([])
    })

    test('Happy Path', () => {
      const parameters = new ParameterParser(['--anything', 'foo', 'bar', 'baz'])
      const output = parameters.getTrailing('a', 'anything')
      expect(output).toStrictEqual(['foo', 'bar', 'baz'])
    })

  })

})
