import { isNumber } from "./Primitive";
import { Guard } from "./Utility";

export type Integer = number;
/**
 * Guard verifying the value to be an integer number
 */
export function isInteger<T = Integer>(value: any): value is T {
	return Number.isSafeInteger(value);
}

export type Float = number;
/**
 * Guard verifying the value to be a float number
 */
export function isFloat<T = Float>(value: any): value is T {
	return !Number.isInteger(value);
}

export type Positive = number;
/**
 * Guard verifying the value to be a positive number
 */
export function isPositive<T = Positive>(value: any): value is T {
	return isNumber(value) && value > 0;
}

export type Negative = number;
/**
 * Guard verifying the value to be a negative number
 */
export function isNegative<T = Negative>(value: any): value is T {
	return isNumber(value) && value < 0;
}

/**
 * Create a guard matching numbers greater than the provided value
 */
export function isGreater<T = number>(than: number): Guard<T> {
	return (value: any): value is T => isNumber(value) && value > than;
}

/**
 * Create a guard matching numbers less than the provided value
 */
export function isLess<T = number>(than: number): Guard<T> {
	return (value: any): value is T => isNumber(value) && value < than;
}

/**
 * Create a guard matching numbers greater than or equal to the provided value
 */
export function isGreaterOrEqual<T = number>(than: number): Guard<T> {
	return (value: any): value is T => isNumber(value) && value >= than;
}

/**
 * Create a guard matching numbers less than or equal to the provided value
 */
export function isLessOrEqual<T = number>(than: number): Guard<T> {
	return (value: any): value is T => isNumber(value) && value <= than;
}
