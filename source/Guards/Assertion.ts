import { AssertionError } from '../Error/AssertionError';
import { all, Guard, Validator } from './Utility';

/**
 * Create an assertion guard, throwing an AssertionError with the provided message if any validator failes
 */
export function assertion<T>(message: string, ...rules: [Validator, ...Array<Validator>]): Guard<T> {
	const valid = all(...rules);
	// create an extend of AssertionError which is a unique value for each assertion
	// this allows for easy recognition whether the AssertionError was thrown from this
	// or other assertions
	class InnerAssertionError extends AssertionError { }

	return (value: any): value is T => {
		try {
			//  validity may throw an error and end up in the catch block
			if (!valid(value)) {
				// if not valid (and not thrown) throw an InnerAssertionError
				throw new InnerAssertionError(message, value);
			}
		}
		catch (error) {
			// the caught error is passed on as origin to a new AssertionError only
			// if it was thrown from the valid checker function
			const rest = error instanceof InnerAssertionError || !(error instanceof AssertionError)
				? []
				: [error]

			throw new AssertionError(message, value, ...rest);
		}

		return true;
	};
}

/**
 * Guard asserting the given value to match the conditions or throw an AssertionError otherwise
 */
export function assert<T>(value: any, message: string, ...rules: [Validator, ...Array<Validator>]): value is T {
	const validate = assertion(message, ...rules);

	return validate(value);
}
