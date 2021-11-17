
# API

## Guards

| export        | description                                             |
| ------------- | ------------------------------------------------------- |
| `isArray`     | value is an array                                       |
| `isBigInt`    | value is a BigInt (if the runtime supports it)          |
| `isBoolean`   | value is a boolean                                      |
| `isFunction`  | value is a function                                     |
| `isNULL`      | value is `NULL`                                         |
| `isNumber`    | value is a number                                       |
| `isObject`    | value is an object (excludes `Array` and `NULL` values) |
| `isString`    | value is a string                                       |
| `isSymbol`    | value is a Symbol                                       |
| `isUndefined` | value is `undefined`                                    |
| `isInteger`   | value is an integer (number)                            |
| `isFloat`     | value is a float (number)                               |
| `isPositive`  | value is a positive number (excludes 0)                 |
| `isNegative`  | value is a negative number (exlucdes 0)                 |

## Composition

| export                | arguments                                                   | description                                                                                                      |
| --------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `is`                  | `string`                                                    | creates a Guard using the native `typeof`                                                                        |
| `any`                 | `Validator [, ...Validator]`                                | creates a Guard matching any validator                                                                           |
| `all`                 | `Validator [, ...Validator]`                                | creates a Guard matching all validators                                                                          |
| `not`                 | `Validator [, ...Validator]`                                | creates a Guard matching none of the validators (inverse of `all`)                                               |
| `isStringWithPattern` | `RegExp`                                                    | creates a Guard matching strings which match the pattern                                                         |
| `isGreater`           | `number`                                                    | creates a Guard matching numbers greater than `number`                                                           |
| `isLess`              | `number`                                                    | creates a Guard matching numbers less than `number`                                                              |
| `isGreaterOrEqual`    | `number`                                                    | creates a Guard matching numbers greater than or equal to `number`                                               |
| `isLessOrEqual`       | `number`                                                    | creates a Guard matching numbers less than or equal to `number`                                                  |
| `isArrayOfType`       | `Validator [, ...Validator]`                                | creates a Guard matching arrays whose items all match all validators                                             |
| `isArrayOfSize`       | `number [, number]`                                         | creates a Guard matching arrays whose size is at least the first number and at most the second (optional) number |
| `isKey`               | `string|symbol`                                             | creates a Guard matching objects with the specified key                                                          |
| `isKeyOfType`         | `string|symbol [, ...Validator]`                            | creates a Guard matching object with the specified key and its value matching all validators                     |
| `isOptionalKeyOfType` | `string|symbol [, ...Validator]`                            | creates a Guard matching object without the specified key or its value matching all validators                   |
| `isStructure`         | `{[key: string|symbol]: Validator} [, Array<string|symbol>` | creates a Guard validating the structure of an object                                                            |
| `isInstanceOf`        | `Class`                                                     | creates a Guard matching the provided class                                                                      |
