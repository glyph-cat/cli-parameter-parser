import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({ Lib: { ParameterParser } }: TestConfig) => {

  test('Empty array', () => {
    const parameters = new ParameterParser([])
    const output = parameters.getOne('a', 'anything')
    expect(output).toBe(null)
  })

  test('Not specified', () => {
    const parameters = new ParameterParser(['-b', 'abc'])
    const output = parameters.getOne('a', 'anything')
    expect(output).toBe(null)
  })

  test('Using alias', () => {
    const parameters = new ParameterParser(['-a', 'foo', '-x', '...'])
    const output = parameters.getOne('a', 'anything')
    expect(output).toBe('foo')
  })

  test('Using name', () => {
    const parameters = new ParameterParser(['--anything', 'foo', '-x', '...'])
    const output = parameters.getOne('a', 'anything')
    expect(output).toBe('foo')
  })

})
