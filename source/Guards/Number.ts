import { isNumber } from "./Primitive";
import { Guard } from "./Utility";

export type Integer = number;
export function isInteger<T = Integer>(value: any): value is T {
	return Number.isSafeInteger(value);
}

export type Float = number;
export function isFloat<T = Float>(value: any): value is T {
	return !Number.isInteger(value);
}

export type Positive = number;
export function isPositive<T = Positive>(value: any): value is T {
	return isNumber(value) && value > 0;
}

export type Negative = number;
export function isNegative<T = Negative>(value: any): value is T {
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
