import test from 'tape';
import * as Main from '../source/main';

test('main - exports', (t) => {
	const expect = [
		'AssertionError',
		'isArrayOfType',
		'isArrayOfSize',
		'assertion',
		'assert',
		'isInteger',
		'isFloat',
		'isPositive',
		'isNegative',
		'isGreater',
		'isLess',
		'isGreaterOrEqual',
		'isLessOrEqual',
		'isKey',
		'isKeyOfType',
		'isOptionalKeyOfType',
		'isStructure',
		'isStrictStructure',
		'isInstanceOf',
		'isArray',
		'isBigInt',
		'isBoolean',
		'isFunction',
		'isNULL',
		'isNumber',
		'isObject',
		'isString',
		'isSymbol',
		'isUndefined',
		'isStringWithPattern',
		'is',
		'any',
		'all',
		'not',
		'Stringifier'
	];

	t.deepEqual(Object.keys(Main), expect, `exports ${expect.join(', ')}`);
	expect.forEach((key) => {
		t.equal(typeof Main[key], 'function', `${key} is a function`);
	});

	t.end();
});

