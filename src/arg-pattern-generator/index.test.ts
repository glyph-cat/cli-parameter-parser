import { argPatternGenerator } from '.'

test('Without alias', () => {
  const pattern = argPatternGenerator(null, 'name')
  expect(pattern.source).toBe('^--name$')
  expect(pattern.flags).toBe('i')
})

test('With alias', () => {
  const pattern = argPatternGenerator('n', 'name')
  expect(pattern.source).toBe('^(-n|--name)$')
  expect(pattern.flags).toBe('i')
})
