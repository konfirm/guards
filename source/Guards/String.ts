import { isString } from "./Primitive";
import { all, Guard } from "./Utility";

export type StringWithPattern = string;

export function isStringWithPattern(pattern: RegExp): Guard<StringWithPattern> {
	return all<StringWithPattern>(isString, (value: string) => pattern.test(value));
}
