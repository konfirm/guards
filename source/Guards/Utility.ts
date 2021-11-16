export type Guard<T> = (value: any) => value is T;
export type Validator = (value: any) => boolean;

export function is<T>(type: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined'): Guard<T> {
	return (value: any): value is T => typeof value === type;
}

export function any<T>(...checks: [Validator, ...Array<Validator>]): Guard<T> {
	return (value: any): value is T => checks.some((check) => check(value));
}

export function all<T>(...checks: [Validator, ...Array<Validator>]): Guard<T> {
	return (value: any): value is T => checks.every((check) => check(value));
}

export function not<T>(...checks: [Validator, ...Array<Validator>]): Guard<T> {
	return (value: any): value is T => checks.every((check) => !check(value));
}
