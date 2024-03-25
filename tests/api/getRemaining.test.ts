import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({ Lib: { ParameterParser } }: TestConfig) => {

  test('Empty array', () => {
    const parameters = new ParameterParser([])
    const output = parameters.getRemaining()
    expect(output).toStrictEqual([])
  })

  test('Happy Path', () => {
    const parameters = new ParameterParser([
      '-a', '1',
      '-b', '2',
      '-c', '3',
      '-a', '4', '5',
      '-d', '6',
      '-e',
      '-f', 'true',
      '-g', 'false',
      '-b', '7', '8',
      '-h', '9', '10', '11'
    ])
    parameters.getOne('d', 'something_d')
    parameters.getBoolean('e', 'something_e')
    parameters.getBoolean('f', 'something_f')
    parameters.getBoolean('g', 'something_g')
    parameters.getAll('a', 'anything')
    parameters.getTrailing('h', 'something_h')
    const output = parameters.getRemaining()
    expect(output).toStrictEqual(['-b', '2', '-c', '3', '-b', '7', '8'])
  })

})
