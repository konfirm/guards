export type Guard<T> = (value: any) => value is T;
export type Validator = (value: any) => boolean;

/**
 * Create a guard verifying the given value matches the specified type
 */
export function is<T>(type: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined'): Guard<T> {
	return (value: any): value is T => typeof value === type;
}

/**
 * Create a guard verifying the given value matches any of the validators
 */
export function any<T>(...checks: [Validator, ...Array<Validator>]): Guard<T> {
	return (value: any): value is T => checks.some((check) => check(value));
}

/**
 * Create a guard verifying the given value matches all of the validators
 */
export function all<T>(...checks: [Validator, ...Array<Validator>]): Guard<T> {
	return (value: any): value is T => checks.every((check) => check(value));
}

/**
 * Create a guard verifying the given value matches none of the validators
 */
export function not<T>(...checks: [Validator, ...Array<Validator>]): Guard<T> {
	return (value: any): value is T => checks.every((check) => !check(value));
}
