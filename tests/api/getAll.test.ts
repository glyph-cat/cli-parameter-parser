import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({ Lib: { ParameterParser } }: TestConfig) => {

  test('Empty array', () => {
    const parameters = new ParameterParser([])
    const output = parameters.getAll('a', 'anything')
    expect(output).toStrictEqual([])
  })

  test('Not specified', () => {
    const parameters = new ParameterParser(['-b', 'abc'])
    const output = parameters.getAll('a', 'anything')
    expect(output).toStrictEqual([])
  })

  test('Only flag, no value', () => {
    const parameters = new ParameterParser(['-a'])
    const output = parameters.getAll('a', 'anything')
    expect(output).toStrictEqual([])
  })

  test('Happy Path (Mixed using name and alias)', () => {
    const parameters = new ParameterParser([
      '-a', 'foo', 'bar', '--anything', 'baz', '-b', 'abc', '-a', 'qux'
    ])
    const output = parameters.getAll('a', 'anything')
    expect(output).toStrictEqual(['foo', 'bar', 'baz', 'qux'])
  })

})
