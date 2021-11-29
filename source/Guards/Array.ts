import { isArray } from "./Primitive";
import { all, Guard, Validator } from "./Utility";

/**
 * Guard verifying the value to be an array containing only elements matching the validators
 */
export function isArrayOfType<T>(...validators: [Validator, ...Array<Validator>]): Guard<T> {
	const check = all(...validators);

	return all<T>(isArray, (value) => value.every(check));
}

/**
 * Guard verifying the value to be an array with a length between the given boundaries
 */
export function isArrayOfSize<T>(min: number, max: number = Infinity): Guard<T> {
	return all(isArray, (value) => value.length >= min && value.length <= max);
}
