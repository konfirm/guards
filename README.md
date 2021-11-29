![tests](https://github.com/konfirm/guards/actions/workflows/tests.yml/badge.svg)
![release](https://github.com/konfirm/guards/actions/workflows/release.yml/badge.svg)

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

### all

▸ **all**<`T`\>(...`checks`): [`Guard`](#guard)<`T`\>

Create a guard verifying the given value matches all of the validators

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                                        |
| :---------- | :---------------------------------------------------------- |
| `...checks` | [[`Validator`](#validator), ...<[`Validator`](#validator)>] |

#### Returns

[`Guard`](#guard)<`T`\>


### any

▸ **any**<`T`\>(...`checks`): [`Guard`](#guard)<`T`\>

Create a guard verifying the given value matches any of the validators

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                                        |
| :---------- | :---------------------------------------------------------- |
| `...checks` | [[`Validator`](#validator), ...<[`Validator`](#validator)>] |

#### Returns

[`Guard`](#guard)<`T`\>


### assert

▸ **assert**<`T`\>(`value`, `message`, ...`rules`): value is T

Guard asserting the given value to match the conditions or throw an AssertionError otherwise

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type                                                        |
| :--------- | :---------------------------------------------------------- |
| `value`    | `any`                                                       |
| `message`  | `string`                                                    |
| `...rules` | [[`Validator`](#validator), ...<[`Validator`](#validator)>] |

#### Returns

value is T


### assertion

▸ **assertion**<`T`\>(`message`, ...`rules`): [`Guard`](#guard)<`T`\>

Create an assertion guard, throwing an AssertionError with the provided message if any validator failes

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type                                                        |
| :--------- | :---------------------------------------------------------- |
| `message`  | `string`                                                    |
| `...rules` | [[`Validator`](#validator), ...<[`Validator`](#validator)>] |

#### Returns

[`Guard`](#guard)<`T`\>


### is

▸ **is**<`T`\>(`type`): [`Guard`](#guard)<`T`\>

Create a guard verifying the given value matches the specified type

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name   | Type                                                                                                                               |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `type` | ``"string"`` \| ``"number"`` \| ``"bigint"`` \| ``"boolean"`` \| ``"symbol"`` \| ``"undefined"`` \| ``"object"`` \| ``"function"`` |

#### Returns

[`Guard`](#guard)<`T`\>


### isArray

▸ `Const` **isArray**(`value`): value is unknown[]

Guard verifying the value is a array

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is unknown[]


### isArrayOfSize

▸ **isArrayOfSize**<`T`\>(`min`, `max?`): [`Guard`](#guard)<`T`\>

Guard verifying the value to be an array with a length between the given boundaries

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type     | Default value |
| :---- | :------- | :------------ |
| `min` | `number` | `undefined`   |
| `max` | `number` | `Infinity`    |

#### Returns

[`Guard`](#guard)<`T`\>


### isArrayOfType

▸ **isArrayOfType**<`T`\>(...`validators`): [`Guard`](#guard)<`T`\>

Guard verifying the value to be an array containing only elements matching the validators

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                                        |
| :-------------- | :---------------------------------------------------------- |
| `...validators` | [[`Validator`](#validator), ...<[`Validator`](#validator)>] |

#### Returns

[`Guard`](#guard)<`T`\>


### isBigInt

▸ `Const` **isBigInt**(`value`): value is BigInt

Guard verifying the value is a bigint

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is BigInt


### isBoolean

▸ `Const` **isBoolean**(`value`): value is boolean

Guard verifying the value is a boolean

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is boolean


### isFloat

▸ **isFloat**<`T`\>(`value`): value is T

Guard verifying the value to be a float number

#### Type parameters

| Name | Type     |
| :--- | :------- |
| `T`  | `number` |

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is T


### isFunction

▸ `Const` **isFunction**(`value`): value is Function

Guard verifying the value is a function

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is Function


### isGreater

▸ **isGreater**<`T`\>(`than`): [`Guard`](#guard)<`T`\>

Create a guard matching numbers greater than the provided value

#### Type parameters

| Name | Type     |
| :--- | :------- |
| `T`  | `number` |

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `than` | `number` |

#### Returns

[`Guard`](#guard)<`T`\>


### isGreaterOrEqual

▸ **isGreaterOrEqual**<`T`\>(`than`): [`Guard`](#guard)<`T`\>

Create a guard matching numbers greater than or equal to the provided value

#### Type parameters

| Name | Type     |
| :--- | :------- |
| `T`  | `number` |

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `than` | `number` |

#### Returns

[`Guard`](#guard)<`T`\>


### isInstanceOf

▸ **isInstanceOf**(`type`): [`Guard`](#guard)<typeof `type`\>

Creates a guard verifying the value is an object and an instance of the given class

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `type` | (...`args`: `any`[]) => `unknown` |

#### Returns

[`Guard`](#guard)<typeof `type`\>


### isInteger

▸ **isInteger**<`T`\>(`value`): value is T

Guard verifying the value to be an integer number

#### Type parameters

| Name | Type     |
| :--- | :------- |
| `T`  | `number` |

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is T


### isKey

▸ **isKey**<`T`\>(`key`): [`Guard`](#guard)<`T`\>

Creates a guard verifying the value is an object and has the given key

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `key` | `Key` |

#### Returns

[`Guard`](#guard)<`T`\>


### isKeyOfType

▸ **isKeyOfType**<`T`\>(`key`, ...`validators`): [`Guard`](#guard)<`T`\>

Creates a guard verifying the value is an object and has the given key matching the validators

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                        |
| :-------------- | :-------------------------- |
| `key`           | `Key`                       |
| `...validators` | [`Validator`](#validator)[] |

#### Returns

[`Guard`](#guard)<`T`\>


### isLess

▸ **isLess**<`T`\>(`than`): [`Guard`](#guard)<`T`\>

Create a guard matching numbers less than the provided value

#### Type parameters

| Name | Type     |
| :--- | :------- |
| `T`  | `number` |

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `than` | `number` |

#### Returns

[`Guard`](#guard)<`T`\>


### isLessOrEqual

▸ **isLessOrEqual**<`T`\>(`than`): [`Guard`](#guard)<`T`\>

Create a guard matching numbers less than or equal to the provided value

#### Type parameters

| Name | Type     |
| :--- | :------- |
| `T`  | `number` |

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `than` | `number` |

#### Returns

[`Guard`](#guard)<`T`\>


### isNULL

▸ `Const` **isNULL**(`value`): value is null

Guard verifying the value is a null

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is null


### isNegative

▸ **isNegative**<`T`\>(`value`): value is T

Guard verifying the value to be a negative number

#### Type parameters

| Name | Type     |
| :--- | :------- |
| `T`  | `number` |

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is T


### isNumber

▸ `Const` **isNumber**(`value`): value is number

Guard verifying the value is a number

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is number


### isObject

▸ `Const` **isObject**(`value`): value is unknown

Guard verifying the value is a object

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is unknown


### isOptionalKeyOfType

▸ **isOptionalKeyOfType**<`T`\>(`key`, ...`validators`): [`Guard`](#guard)<`T`\>

Creates a guard verifying the value is an object and doesn't have the key or has the given key matching the validators

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                        |
| :-------------- | :-------------------------- |
| `key`           | `Key`                       |
| `...validators` | [`Validator`](#validator)[] |

#### Returns

[`Guard`](#guard)<`T`\>


### isPositive

▸ **isPositive**<`T`\>(`value`): value is T

Guard verifying the value to be a positive number

#### Type parameters

| Name | Type     |
| :--- | :------- |
| `T`  | `number` |

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is T


### isStrictStructure

▸ **isStrictStructure**<`T`\>(`struct`, ...`options`): [`Guard`](#guard)<`T`\>

Creates a guard verifying the value is an object matching exactly the structure

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                 |
| :----------- | :------------------- |
| `struct`     | `Object`             |
| `...options` | (`Key` \| `Key`[])[] |

#### Returns

[`Guard`](#guard)<`T`\>


### isString

▸ `Const` **isString**(`value`): value is string

Guard verifying the value is a string

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is string


### isStringWithPattern

▸ **isStringWithPattern**<`T`\>(`pattern`): [`Guard`](#guard)<`T`\>

Guard verifying the value to be a string which matches the given pattern

#### Type parameters

| Name | Type     |
| :--- | :------- |
| `T`  | `string` |

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `pattern` | `RegExp` |

#### Returns

[`Guard`](#guard)<`T`\>


### isStructure

▸ **isStructure**<`T`\>(`struct`, ...`options`): [`Guard`](#guard)<`T`\>

Creates a guard verifying the value is an object matching at least the structure

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                 |
| :----------- | :----------------------------------- |
| `struct`     | `Struct`<[`Validator`](#validator)\> |
| `...options` | (`Key` \| `Key`[])[]                 |

#### Returns

[`Guard`](#guard)<`T`\>


### isSymbol

▸ `Const` **isSymbol**(`value`): value is Symbol

Guard verifying the value is a symbol

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is Symbol


### isUndefined

▸ `Const` **isUndefined**(`value`): value is undefined

Guard verifying the value is a undefined

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

value is undefined


### not

▸ **not**<`T`\>(...`checks`): [`Guard`](#guard)<`T`\>

Create a guard verifying the given value matches none of the validators

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type                                                        |
| :---------- | :---------------------------------------------------------- |
| `...checks` | [[`Validator`](#validator), ...<[`Validator`](#validator)>] |

#### Returns

[`Guard`](#guard)<`T`\>

## Type aliases

### Float

Ƭ **Float**: `number`


### Guard

Ƭ **Guard**<`T`\>: (`value`: `any`) => value is T

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

▸ (`value`): value is T

##### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

##### Returns

value is T


### Integer

Ƭ **Integer**: `number`


### Negative

Ƭ **Negative**: `number`


### Positive

Ƭ **Positive**: `number`


### StringWithPattern

Ƭ **StringWithPattern**: `string`


### Validator

Ƭ **Validator**: (`value`: `any`) => `boolean`

#### Type declaration

▸ (`value`): `boolean`

##### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

##### Returns

`boolean`




## License
MIT License Copyright (c) 2021 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
