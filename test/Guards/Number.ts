import test from 'tape';
import * as Numbers from '../../source/Guards/Number';

test('Guards/Number - exports', (t) => {
	const expect = [
		'isInteger',
		'isFloat',
		'isPositive',
		'isNegative',
		'isGreater',
		'isLess',
		'isGreaterOrEqual',
		'isLessOrEqual',
	];
	t.deepEqual(Object.keys(Numbers), expect, `exports ${expect.join(', ')}`);
	expect.forEach((key) => {
		t.equal(typeof Numbers[key], 'function', `${key} is a function`);
	});

	t.end();
});

const values = {
	isInteger: [0, 1, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
	isFloat: [Math.PI, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
	isPositive: [1, Number.MAX_SAFE_INTEGER, Number.POSITIVE_INFINITY],
	isNegative: [-1, Number.MIN_SAFE_INTEGER, Number.NEGATIVE_INFINITY],
};
const keys = Object.keys(values);

test('Types/Number - isInteger', (t) => {
	t.ok(values.isInteger.every((value) => Numbers.isInteger(value)), `is integer ${values.isInteger}`);
	t.notOk(values.isFloat.every((value) => Numbers.isInteger(value)), `is not integer ${values.isFloat}`);

	t.end();
});

test('Types/Number - isFloat', (t) => {
	t.ok(values.isFloat.every((value) => Numbers.isFloat(value)), `is float ${values.isFloat}`);
	t.notOk(values.isFloat.every((value) => Numbers.isInteger(value)), `is not float ${values.isInteger}`);

	t.end();
});

test('Types/Number - isPositive', (t) => {
	t.notOk(Numbers.isPositive(0), '0 is not positive');
	t.notOk(Numbers.isPositive(-0), '-0 is not positive');
	t.ok(values.isPositive.every((value) => Numbers.isPositive(value)), `is positive ${values.isPositive}`);
	t.notOk(values.isNegative.every((value) => Numbers.isPositive(value)), `is not positive ${values.isNegative}`);

	t.end();
});

test('Types/Number - isNegative', (t) => {
	t.notOk(Numbers.isNegative(0), '0 is not negative');
	t.notOk(Numbers.isNegative(-0), '-0 is not negative');
	t.ok(values.isNegative.every((value) => Numbers.isNegative(value)), `is negative ${values.isNegative}`);
	t.notOk(values.isNegative.every((value) => Numbers.isPositive(value)), `is not negative ${values.isPositive}`);

	t.end();
});

test('Guards/Number - isGreater', (t) => {
	const isGreaterThanTwo = Numbers.isGreater(2);
	const isGreaterThanMinusTwo = Numbers.isGreater(-2);

	t.notOk(isGreaterThanTwo(-10), '-10 does not match isGreater(2)');
	t.notOk(isGreaterThanMinusTwo(-10), '-10 does not match isGreater(-2)');
	t.notOk(isGreaterThanTwo(-2), '-2 does not match isGreater(2)');
	t.notOk(isGreaterThanMinusTwo(-2), '-2 does not match isGreater(-2)');
	t.notOk(isGreaterThanTwo(-1), '-1 does not match isGreater(2)');
	t.ok(isGreaterThanMinusTwo(-1), '-1 matches isGreater(-2)');
	t.notOk(isGreaterThanTwo(0), '0 does not match isGreater(2)');
	t.ok(isGreaterThanMinusTwo(0), '0 matches isGreater(-2)');
	t.notOk(isGreaterThanTwo(2), '2 does not match isGreater(2)');
	t.ok(isGreaterThanMinusTwo(2), '2 matches isGreater(-2)');
	t.ok(isGreaterThanTwo(10), '10 matches isGreater(2)');
	t.ok(isGreaterThanMinusTwo(10), '10 matches isGreater(-2)');

	t.end();
});

test('Guards/Number - isLess', (t) => {
	const isLessThanTwo = Numbers.isLess(2);
	const isLessThanMinusTwo = Numbers.isLess(-2);

	t.ok(isLessThanTwo(-10), '-10 matches isLess(2)');
	t.ok(isLessThanMinusTwo(-10), '-10 matches isLess(-2)');
	t.ok(isLessThanTwo(-2), '-2 matches isLess(2)');
	t.notOk(isLessThanMinusTwo(-2), '-2 does not match isLess(-2)');
	t.ok(isLessThanTwo(-1), '-1 matches isLess(2)');
	t.notOk(isLessThanMinusTwo(-1), '-1 does not match isLess(-2)');
	t.ok(isLessThanTwo(0), '0 matches isLess(2)');
	t.notOk(isLessThanMinusTwo(0), '0 does not match isLess(-2)');
	t.notOk(isLessThanTwo(2), '2 does not match isLess(2)');
	t.notOk(isLessThanMinusTwo(2), '2 does not match isLess(-2)');
	t.notOk(isLessThanTwo(10), '10 does not match isLess(2)');
	t.notOk(isLessThanMinusTwo(10), '10 does not match isLess(-2)');

	t.end();
});

test('Guards/Number - isGreaterOrEqual', (t) => {
	const isGreaterOrEqualTwo = Numbers.isGreaterOrEqual(2);
	const isGreaterOrEqualMinusTwo = Numbers.isGreaterOrEqual(-2);

	t.notOk(isGreaterOrEqualTwo(-10), '-10 does not match isGreaterOrEqual(2)');
	t.notOk(isGreaterOrEqualMinusTwo(-10), '-10 does not match isGreaterOrEqual(-2)');
	t.notOk(isGreaterOrEqualTwo(-2), '-2 does not match isGreaterOrEqual(2)');
	t.ok(isGreaterOrEqualMinusTwo(-2), '-2 matches isGreaterOrEqual(-2)');
	t.notOk(isGreaterOrEqualTwo(-1), '-1 does not match isGreaterOrEqual(2)');
	t.ok(isGreaterOrEqualMinusTwo(-1), '-1 matches isGreaterOrEqual(-2)');
	t.notOk(isGreaterOrEqualTwo(0), '0 does not match isGreaterOrEqual(2)');
	t.ok(isGreaterOrEqualMinusTwo(0), '0 matches isGreaterOrEqual(-2)');
	t.ok(isGreaterOrEqualTwo(2), '2 matches isGreaterOrEqual(2)');
	t.ok(isGreaterOrEqualMinusTwo(2), '2 matches isGreaterOrEqual(-2)');
	t.ok(isGreaterOrEqualTwo(10), '10 matches isGreaterOrEqual(2)');
	t.ok(isGreaterOrEqualMinusTwo(10), '10 matches isGreaterOrEqual(-2)');

	t.end();
});

test('Guards/Number - isLessOrEqual', (t) => {
	const isLessOrEqualTwo = Numbers.isLessOrEqual(2);
	const isLessOrEqualMinusTwo = Numbers.isLessOrEqual(-2);

	t.ok(isLessOrEqualTwo(-10), '-10 matches isLessOrEqual(2)');
	t.ok(isLessOrEqualMinusTwo(-10), '-10 matches isLessOrEqual(-2)');
	t.ok(isLessOrEqualTwo(-2), '-2 matches isLessOrEqual(2)');
	t.ok(isLessOrEqualMinusTwo(-2), '-2 matches isLessOrEqual(-2)');
	t.ok(isLessOrEqualTwo(-1), '-1 matches isLessOrEqual(2)');
	t.notOk(isLessOrEqualMinusTwo(-1), '-1 does not match isLessOrEqual(-2)');
	t.ok(isLessOrEqualTwo(0), '0 matches isLessOrEqual(2)');
	t.notOk(isLessOrEqualMinusTwo(0), '0 does not match isLessOrEqual(-2)');
	t.ok(isLessOrEqualTwo(2), '2 matches isLessOrEqual(2)');
	t.notOk(isLessOrEqualMinusTwo(2), '2 does not match isLessOrEqual(-2)');
	t.notOk(isLessOrEqualTwo(10), '10 does not match isLessOrEqual(2)');
	t.notOk(isLessOrEqualMinusTwo(10), '10 does not match isLessOrEqual(-2)');

	t.end();
});
