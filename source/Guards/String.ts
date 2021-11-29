import { isString } from "./Primitive";
import { all, Guard } from "./Utility";

export type StringWithPattern = string;

/**
 * Guard verifying the value to be a string which matches the given pattern
 */
export function isStringWithPattern<T = StringWithPattern>(pattern: RegExp): Guard<T> {
	return all<T>(isString, (value: string) => pattern.test(value));
}
