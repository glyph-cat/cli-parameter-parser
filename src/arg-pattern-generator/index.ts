export function argPatternGenerator(alias: string | null, name: string): RegExp {
  const regexFlags = 'i'
  if (alias) {
    return new RegExp(`^(-${alias}|--${name})$`, regexFlags)
  } else {
    return new RegExp(`^--${name}$`, regexFlags)
  }
}
