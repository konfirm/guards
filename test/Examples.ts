import test from 'tape';
import { all, any, isArrayOfSize, isArrayOfType, isGreaterOrEqual, isInteger, isNumber, isString, isStructure } from '../source/main';

test('Example - isArrayWithSizeBetweenOneAndTwoOfStringsOrNumbers', (t) => {
	type Mixed = string | number;
	type MixedList = [Mixed, Mixed?];
	const isArrayWithSizeBetweenOneAndTwoOfStringsOrNumbers = all<MixedList>(isArrayOfType<Mixed>(any(isString, isNumber)), isArrayOfSize(1, 2));

	t.notOk(isArrayWithSizeBetweenOneAndTwoOfStringsOrNumbers([0, false]), '[0, false] does not match');
	t.ok(isArrayWithSizeBetweenOneAndTwoOfStringsOrNumbers([0, 'hello']), '[0, "hello"] does match');
	t.notOk(isArrayWithSizeBetweenOneAndTwoOfStringsOrNumbers([0, 'hello', 1]), '[0, "hello", 1] does not match');

	t.end();
});

test('Example - isAtLeast21', (t) => {
	const isAtLeast21 = isStructure({
		age: all(isInteger, isGreaterOrEqual(21)),
	});
	const jane = { name: 'Jane Doe', age: 42 };
	const jimmy = { name: 'Jimmy Doe', age: 17 };
	const ageless = { name: 'No Age' };

	t.ok(isAtLeast21(jane), 'Jane is at least 21');
	t.notOk(isAtLeast21(jimmy), 'Jimmy is not at least 21');
	t.notOk(isAtLeast21(ageless), 'ageless is not at least 21');

	t.end();
});
