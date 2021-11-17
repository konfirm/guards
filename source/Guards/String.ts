import { isString } from "./Primitive";
import { all, Guard } from "./Utility";

export type StringWithPattern = string;

export function isStringWithPattern<T = StringWithPattern>(pattern: RegExp): Guard<T> {
	return all<T>(isString, (value: string) => pattern.test(value));
}
