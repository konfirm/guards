import { all, is, not } from "./Utility";

/**
 * Guard verifying the value is a array
 */
export const isArray = (value: any): value is Array<unknown> => Array.isArray(value);

/**
 * Guard verifying the value is a bigint
 */
export const isBigInt = is<BigInt>('bigint');

/**
 * Guard verifying the value is a boolean
 */
export const isBoolean = is<boolean>('boolean');

/**
 * Guard verifying the value is a function
 */
export const isFunction = is<Function>('function');

/**
 * Guard verifying the value is a null
 */
export const isNULL = (value: any): value is null => value === null;

/**
 * Guard verifying the value is a number
 */
export const isNumber = is<number>('number');

/**
 * Guard verifying the value is a object
 */
export const isObject = all(not(isArray), not(isNULL), is<{ [key: string]: unknown }>('object'));

/**
 * Guard verifying the value is a string
 */
export const isString = is<string>('string');

/**
 * Guard verifying the value is a symbol
 */
export const isSymbol = is<Symbol>('symbol');

/**
 * Guard verifying the value is a undefined
 */
export const isUndefined = is<undefined>('undefined');

