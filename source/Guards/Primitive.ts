import { all, is, not } from "./Utility";

export const isArray = (value: any): value is Array<unknown> => Array.isArray(value);
export const isBigInt = is<BigInt>('bigint');
export const isBoolean = is<boolean>('boolean');
export const isFunction = is<Function>('function');
export const isNULL = (value: any): value is null => value === null;
export const isNumber = is<number>('number');
export const isObject = all(not(isArray), not(isNULL), is<{ [key: string]: unknown }>('object'));
export const isString = is<string>('string');
export const isSymbol = is<Symbol>('symbol');
export const isUndefined = is<undefined>('undefined');
