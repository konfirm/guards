import { isObject } from "./Primitive";
import { Guard, Validator, all, any, not } from "./Utility";

export function isKey<T>(key: string): Guard<T> {
	return all(isObject, (value) => key in value);
}

export function isKeyOfType<T>(key: string, ...validators: Array<Validator>): Guard<T> {
	return all<T>(isKey(key), (value: any) => validators.every((check) => check(value[key])));
}

export function isOptionalKeyOfType<T>(key: string, ...validators: Array<Validator>): Guard<T> {
	return any<T>(all(isObject, not(isKey(key))), isKeyOfType(key, ...validators));
}

export function isStructure<T>(struct: { [key: string | symbol]: Validator }, optional: Array<keyof typeof struct> = []): Guard<T> {
	const validators: Array<Validator> = Object.keys(struct)
		.map((key) => (optional.includes(key) ? isOptionalKeyOfType : isKeyOfType)<T>(key, struct[key]));

	return all<T>(isObject, ...validators);
}

export function isInstanceOf(type: new (...args: Array<any>) => unknown): Guard<typeof type> {
	return (value: any): value is typeof type => value instanceof type;
}
