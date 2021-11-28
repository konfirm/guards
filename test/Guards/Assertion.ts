import test from 'tape';
import { AssertionError } from '../../source/Error/AssertionError';
import * as Assertion from '../../source/Guards/Assertion';
import { all, isGreaterOrEqual, isLess, isNumber, isString, isStringWithPattern, isStructure } from '../../source/main';

test('Guards/Assertion - exports', (t) => {
	const expect = ['assertion', 'assert'];

	t.deepEqual(Object.keys(Assertion), expect, `exports ${expect.join(', ')}`);
	expect.forEach((key) => {
		t.equal(typeof Assertion[key], 'function', `${key} is a function`);
	});

	t.end();
});

const { assertion, assert } = Assertion;

function verify(structure: { [key: string]: unknown }): (error: Error) => boolean {
	const keys = Object.keys(structure);

	return (error: Error): boolean =>
		error instanceof AssertionError
		&& String(error) === error.reason
		&& keys.every((key) => JSON.stringify(structure[key]) === JSON.stringify(error[key]));
}

test('Guards/Assertion - assertion', (t) => {
	const assertString = assertion('expected string', isString);

	t.ok(assertString('string'), 'isString assertion does not throw on string input');

	const numeric = {
		message: 'expected string',
		reason: '1234 expected string',
		reasons: [
			'1234 expected string',
		],
		cause: [
			{ value: 1234, message: 'expected string' },
		],
	}
	t.throws(() => assertString(1234), verify(numeric), `1234 throws ${JSON.stringify(numeric)}`);

	t.end();
});

test('Guards/Assertion - nested assertions', (t) => {
	const struct = {
		name: assertion('expected name', isStringWithPattern(/.+/)),
		age: assertion('is between 10 and 20', all(
			assertion('is 10 or older', isGreaterOrEqual(10)),
			assertion('is less than 20', isLess(20))
		)),
	};
	const isYouth = assertion('expected youth structure', isStructure(struct, 'age'));

	const youth21 = {
		message: 'expected youth structure',
		reason: '{name:"Youth",age:21} expected youth structure​←​21 is between 10 and 20​←​21 is less than 20',
		reasons: [
			'21 is less than 20',
			'21 is between 10 and 20',
			'{name:"Youth",age:21} expected youth structure',
		],
		cause: [
			{ value: { name: 'Youth', age: 21 }, message: 'expected youth structure' },
			{ value: 21, message: 'is between 10 and 20' },
			{ value: 21, message: 'is less than 20' },
		],
	}
	t.throws(() => isYouth({ name: 'Youth', age: 21 }), verify(youth21), `{name:"Youth",age:21} throws ${JSON.stringify(youth21)}`)

	const youth7 = {
		message: 'expected youth structure',
		reason: '{name:"Youth",age:7} expected youth structure​←​7 is between 10 and 20​←​7 is 10 or older',
		reasons: [
			'7 is 10 or older',
			'7 is between 10 and 20',
			'{name:"Youth",age:7} expected youth structure',
		],
		cause: [
			{ value: { name: 'Youth', age: 7 }, message: 'expected youth structure' },
			{ value: 7, message: 'is between 10 and 20' },
			{ value: 7, message: 'is 10 or older' },
		],
	}
	t.throws(() => isYouth({ name: 'Youth', age: 7 }), verify(youth7), `{name:"Youth",age:7} throws ${JSON.stringify(youth7)}`)

	const unnamed = {
		message: 'expected youth structure',
		reason: '{name:<empty string>,age:17} expected youth structure​←​<empty string> expected name',
		reasons: [
			'<empty string> expected name',
			'{name:<empty string>,age:17} expected youth structure',
		],
		cause: [
			{ value: { name: '', age: 17 }, message: 'expected youth structure' },
			{ value: '', message: 'expected name' },
		],
	};
	t.throws(() => isYouth({ name: '', age: 17 }), verify(unnamed), `{name:"",age:17} throws ${JSON.stringify(unnamed)}`);

	t.ok(isYouth({ name: 'Works' }), 'does not throw on {name:"Works"}');
	t.ok(isYouth({ name: 'Works', age: 14 }), 'does not throw on {name:"Works",age:14}');

	t.end();
});

test('Guards/Assertion - assert', (t) => {
	t.ok(assert('foo', 'is string', isString), '"foo" asserts as string');

	const number = {
		message: 'is number',
		reason: '"foo" is number',
		reasons: [
			'"foo" is number',
		],
		cause: [
			{ value: 'foo', message: 'is number' },
		],
	};
	t.throws(() => assert('foo', 'is number', isNumber), verify(number), '"foo" does not assert as number');

	t.end();
});
