import { isObject } from "./Primitive";
import { Guard, Validator, all, any, not } from "./Utility";

type Key = string | symbol;
type Struct<T = unknown> = { [key: Key]: T };

export function isKey<T>(key: Key): Guard<T> {
	return all(isObject, (value) => key in value);
}

export function isKeyOfType<T>(key: Key, ...validators: Array<Validator>): Guard<T> {
	return all<T>(isKey(key), (value: any) => validators.every((check) => check(value[key])));
}

export function isOptionalKeyOfType<T>(key: Key, ...validators: Array<Validator>): Guard<T> {
	return any<T>(all(isObject, not(isKey(key))), isKeyOfType(key, ...validators));
}

export function isStructure<T>(struct: Struct<Validator>, ...options: Array<Key | Array<Key>>): Guard<T> {
	const optional = options.reduce((carry: Array<Key>, key) => carry.concat(key), []) as Array<Key>;
	const validators: Array<Validator> = Object.keys(struct)
		.map((key) => (optional.includes(key) ? isOptionalKeyOfType : isKeyOfType)<T>(key, struct[key]));

	return all<T>(isObject, ...validators);
}

export function isStrictStructure<T>(struct: { [key: string | symbol]: Validator }, ...options: Array<Key | Array<Key>>): Guard<T> {
	const keys = Object.keys(struct);

	return all<T>(
		// do the keys present match the given structure conditions
		isStructure(struct, ...options),
		// every key should be part of the structure
		(value: any) => Object.keys(value).every((key) => keys.includes(key))
	);
}

export function isInstanceOf(type: new (...args: Array<any>) => unknown): Guard<typeof type> {
	return (value: any): value is typeof type => value instanceof type;
}
