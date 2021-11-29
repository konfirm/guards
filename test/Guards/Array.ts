import test from 'tape';
import { isBoolean, isNumber } from '../../source/Guards/Primitive';
import { any, not } from '../../source/Guards/Utility';
import * as Arrays from '../../source/Guards/Array';

test('Guards/Array - exports', (t) => {
	const expect = ['isArrayOfType', 'isArrayOfSize'];

	t.deepEqual(Object.keys(Arrays), expect, `exports ${expect.join(', ')}`);
	expect.forEach((key) => {
		t.equal(typeof Arrays[key], 'function', `${key} is a function`);
	});

	t.end();
});

test('Guards/Array - isArrayOfType', (t) => {
	const isBooleanArray = Arrays.isArrayOfType(isBoolean);
	const isNumberArray = Arrays.isArrayOfType(isNumber);
	const isBooleanOrNumberArray = Arrays.isArrayOfType(any(isBoolean, isNumber));

	t.ok(isBooleanArray([]), 'empty array matches isArrayOfType(isBoolean)')
	t.ok(isNumberArray([]), 'empty array matches isArrayOfType(isNumber)')
	t.ok(isBooleanOrNumberArray([]), 'empty array matches isArrayOfType(any(isBoolean, isNumber))');

	t.ok(isBooleanArray([true, false]), '[true, false] matches isArrayOfType(isBoolean)');
	t.notOk(isNumberArray([true, false]), '[true, false] does not match isArrayOfType(isNumber)');
	t.ok(isBooleanOrNumberArray([true, false]), '[true, false] matches isArrayOfType(any(isBoolean, isNumber))');

	t.notOk(isBooleanArray([1, 2, 3]), '[1, 2, 3] does not match isArrayOfType(isBoolean)');
	t.ok(isNumberArray([1, 2, 3]), '[1, 2, 3] matches isArrayOfType(isNumber)');
	t.ok(isBooleanOrNumberArray([1, 2, 3]), '[1, 2, 3] matches isArrayOfType(any(isBoolean, isNumber))');

	t.notOk(isBooleanArray([0, false]), '[0, false] does not match isArrayOfType(isBoolean)');
	t.notOk(isNumberArray([0, false]), '[0, false] does not match isArrayOfType(isNumber)');
	t.ok(isBooleanOrNumberArray([0, false]), '[0, false] matches isArrayOfType(any(isBoolean, isNumber))');

	t.notOk(isBooleanArray([false, 0, 'no']), '[false, 0, "no"] does not match isArrayOfType(isBoolean)');
	t.notOk(isNumberArray([false, 0, 'no']), '[false, 0, "no"] does not match isArrayOfType(isNumber)');
	t.notOk(isBooleanOrNumberArray([false, 0, 'no']), '[false, 0, "no"] does not match isArrayOfType(any(isBoolean, isNumber))');

	t.end();
});

test('Guards/Array - isArrayOfSize', (t) => {
	const isArrayOfLeastOne = Arrays.isArrayOfSize(1);
	const isArrayOfSizeOne = Arrays.isArrayOfSize(1, 1);
	const isArrayOfCapOne = Arrays.isArrayOfSize(0, 1);
	const isEmptyArray = not(Arrays.isArrayOfSize(1));

	t.notOk(isArrayOfLeastOne([]), '[] does not match isArrayOfSize(1)');
	t.notOk(isArrayOfSizeOne([]), '[] does not match isArrayOfSize(1, 1)');
	t.ok(isArrayOfCapOne([]), '[] matches isArrayOfSize(0, 1)');
	t.ok(isEmptyArray([]), '[] matches not(isArrayOfSize(1))');

	t.ok(isArrayOfLeastOne([1]), '[1] matches isArrayOfSize(1)');
	t.ok(isArrayOfSizeOne([1]), '[1] matches isArrayOfSize(1, 1)');
	t.ok(isArrayOfCapOne([1]), '[1] matches isArrayOfSize(0, 1)');
	t.notOk(isEmptyArray([1]), '[1] does not match not(isArrayOfSize(1))');

	t.ok(isArrayOfLeastOne([1, 2]), '[1, 2] matches isArrayOfSize(1)');
	t.notOk(isArrayOfSizeOne([1, 2]), '[1, 2] does not match isArrayOfSize(1, 1)');
	t.notOk(isArrayOfCapOne([1, 2]), '[1, 2] does not match isArrayOfSize(0, 1)');
	t.notOk(isEmptyArray([1, 2]), '[1, 2] does not match not(isArrayOfSize(1))');

	t.end();
});
