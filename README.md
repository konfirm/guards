# Guard

Guards - or input validation - is a concept in Typescript which allows you to easily ensure specific types. Besides being a great assistance when authoring your code in Typescript, they have the added benefit of being preserved during the transpilation to Javascript, which means your validations will become part of the 'compiled' Javascript.
This solves an important issue with Typescript based projects at runtime, as the integrity of the data will still be guaranteed by your Guards.

For pure Javascript developers this is good news, as these Guards easily let you validate your variables too.

## Installation

```
npm install --save @konfirm/guard
```

Or use your favorite package manager to install `@konfirm/guard`

## API

### Guards
The exported Guards are ready to use validators.

| export        | TS type                          | description                                             |
| ------------- | -------------------------------- | ------------------------------------------------------- |
| `isArray`     | `Array`                          | value is an array                                       |
| `isBigInt`    | `BigInt`                         | value is a BigInt (if the JS runtime supports it)       |
| `isBoolean`   | `boolean`                        | value is a boolean                                      |
| `isFunction`  | `Function`                       | value is a function                                     |
| `isNULL`      | `null`                           | value is `NULL`                                         |
| `isNumber`    | `number`                         | value is a number                                       |
| `isObject`    | `{[key:string|symbol]: unknown}` | value is an object (excludes `Array` and `NULL` values) |
| `isString`    | `string`                         | value is a string                                       |
| `isSymbol`    | `symbol`                         | value is a Symbol                                       |
| `isUndefined` | `undefined`                      | value is `undefined`                                    |
| `isInteger`   | `Integer` (can be overruled)     | value is an integer (number)                            |
| `isFloat`     | `Float` (can be overruled)       | value is a float (number)                               |
| `isPositive`  | `Positive` (can be overruled)    | value is a positive number (excludes 0)                 |
| `isNegative`  | `Negative` (can be overruled)    | value is a negative number (exlucdes 0)                 |

#### Examples

##### Typescript
```js
import { isPositve } from '@konfirm/guard';

const value = 10;
if (isPositve(value)) {
	console.log(`${value} is a positve number`);
}
else {
	console.log(`${value} is not a positve number`);
}
```

##### Javascript
```js
//const { isInteger } = require('@konfirm/guard'); // CommonJS
import { isInteger } from '@konfirm/guard'; // ES Modules

const value = 10;
if (isInteger(value)) {
	console.log(`${value} is an integer`);
}
else {
	console.log(`${value} is not an integer`);
}
```

### Composition
Compose new Guards.

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
| `isInstanceOf`        | `Constructor`                                               | creates a Guard validating the prototype inheritance of an object                                                |

#### Examples

#### Typescript
```ts
import { isArrayOfType, isArrayOfSize, isString, isNumber, all, any } from '@konfirm/guard';

type Mixed = string | number;
type MixedList = [Mixed, Mixed?];
const isArrayWithSizeBetweenOneAndTwoOfStringsOrNumbers = all<MixedList>(isArrayOfType<Mixed>(any(isString, isNumber)), isArrayOfSize(1, 2));

const nope = [0, false];
const sure = [0, 'hello'];

if (isArrayWithSizeBetweenOneAndTwoOfStringsOrNumbers(nope)) {
	console.log(`${nope} is an Array containing one to two string or number types`);
}
else {
	console.log(`${nope} is not an Array containing one to two string or number types`);
}

if (isArrayWithSizeBetweenOneAndTwoOfStringsOrNumbers(sure)) {
	console.log(`${sure} is an Array containing one to two string or number types`);
}
else {
	console.log(`${sure} is not an Array containing one to two string or number types`);
}
```

#### Javascript
```js
// const { isStructure, isInteger, isGreaterOfEqual, all } = require('@konfirm/guard'); // CommonJS
import { isStructure, isInteger, isGreaterOfEqual, all } from '@konfirm/guard'; // ES Modules

const isAtLeast21 = isStructure({
	age: all(isInteger, isGreaterOrEqual(21)),
});
const jane = { name: 'Jane Doe', age: 42 };
const jimmy = { name: 'Jimmy Doe', age: 17 };
const ageless = { name: 'No Age' };

if (isAtLeast21(jane)) {
	console.log(`${jane} is at least 21`);
}
else {
	console.log(`${jane} is not at least 21`);
}

if (isAtLeast21(jimmy)) {
	console.log(`${jimmy} is at least 21`);
}
else {
	console.log(`${jimmy} is not at least 21`);
}

if (isAtLeast21(ageless)) {
	console.log(`${ageless} is at least 21`);
}
else {
	console.log(`${ageless} is not at least 21`);
}
```

## License
MIT License Copyright (c) 2021 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
