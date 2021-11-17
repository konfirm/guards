import { isNumber } from "./Primitive";
import { Guard } from "./Utility";

export type Integer = number;
export function isInteger(value: any): value is Integer {
	return Number.isSafeInteger(value);
}

export type Float = number;
export function isFloat(value: any): value is Float {
	return !Number.isInteger(value);
}

export type Positive = number;
export function isPositive(value: any): value is Positive {
	return isNumber(value) && value > 0;
}

export type Negative = number;
export function isNegative(value: any): value is Negative {
	return isNumber(value) && value < 0;
}

export function isGreater<T = number>(than: number): Guard<T> {
	return (value: any): value is T => isNumber(value) && value > than;
}

export function isLess<T = number>(than: number): Guard<T> {
	return (value: any): value is T => isNumber(value) && value < than;
}

export function isGreaterOrEqual<T = number>(than: number): Guard<T> {
	return (value: any): value is T => isNumber(value) && value >= than;
}

export function isLessOrEqual<T = number>(than: number): Guard<T> {
	return (value: any): value is T => isNumber(value) && value <= than;
}
