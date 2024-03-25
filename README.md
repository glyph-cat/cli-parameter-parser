## Glossary

* name — The full name of the parameter (without spaces), for example, "anything", and it would be passed as an argument with two leading dashes like `--anything`.
* alias — The short form of the parameter, preferably one letter, for example, "a", and it would be passed as an argument with one leading dash like `-a`.

## Basic Usage

* The arguments that are being passed to our application usually starts at index `2`.
* We can use the spread operator to take the remaining arguments from `process.argv`.

```js
const [_ignore0, _ignore1, ...rawParameters] = process.argv
const parameters = new ParameterParser(rawParameters)
```

## `getOne`

* Gets just one parameter.

### CLI input

```sh
someCommand --anything foo -x abc
```

or:
```sh
someCommand -a foo -x abc
```

### To read the parameters
```js
const parameters = new ParameterCollection(rawParameters)
const anything = parameters.getOne('a', 'anything')
console.log(anything) // foo
```

## `getBoolean`

* Gets just one parameter and parse it as a `boolean`.
* Syntaxes that evaluate to `true` are `-a`, `-a true`, `-a t`, `-a yes`, `-a y`, `-a 1`, given that `-a` is the alias of the parameter.

### CLI input

```sh
someCommand --anything
```

### To read the parameters

```js
const parameters = new ParameterCollection(rawParameters)
const input = parameters.getBoolean('a', 'anything')
console.log(input) // true
```

## `getArray`

* Gets all parameters with the same name or alias.

### CLI input
```sh
someCommand -a foo bar --anything baz -b abc -a qux
```

### To read the parameters
```js
const parameters = new ParameterCollection(rawParameters)
const inputs = parameters.getArray('a', 'anything')
console.log(inputs) // ['foo', 'bar', 'baz', 'qux']
```

## `getTrailing`

* Finds the matching name OR alias, then get all values that are behind it, assuming that there will be no other parameters already.
* This is only used to enforce syntax style, prefer `getArray` whenever possible for more flexibility.

### CLI input

```sh
someCommand -x aaa -y bbb -z ccc -a foo bar baz
```

### To read the parameters

```js
const parameters = new ParameterCollection(rawParameters)
const inputs = parameters.getTrailing('a', 'anything')
console.log(inputs) // ['foo', 'bar', 'baz']
```

## `getRemaining`
* Gets all the parameter names, aliases, and values that are not being processed by the "get" methods mentioned above.
* Used to check and warn users about stray/unrecognized parameters that they may have provided.
* This should only be called after retrieving all necessary parameters.

```sh
someCommand -a foo -b bar
```

```js
const parameters = new ParameterCollection(rawParameters)
const anything = parameters.getOne('a', 'anything')
const strayParameters = parameters.getRemaining()
console.log(strayParameters) // ['-b', 'bar']
```
