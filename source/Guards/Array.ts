import { isArray } from "./Primitive";
import { all, Guard, Validator } from "./Utility";

export function isArrayOfType<T>(...validators: [Validator, ...Array<Validator>]): Guard<T> {
	const check = all(...validators);

	return all<T>(isArray, (value) => value.every(check));
}

export function isArrayOfSize<T>(min: number, max: number = Infinity): Guard<T> {
	return all(isArray, (value) => value.length >= min && value.length <= max);
}
