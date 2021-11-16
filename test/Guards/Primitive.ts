import test from 'tape';
import * as Primitive from '../../source/Guards/Primitive';

const types = {
	isArray: [[], [1, 2, 3]],
	isBigInt: [BigInt(12345678901234567890)],
	isBoolean: [true, false],
	isFunction: [() => { }, function () { }],
	isNULL: [null],
	isNumber: [1, Math.PI, Infinity, -Infinity, NaN],
	isObject: [{}, /^$/, new Date()],
	isString: ['one', 'two'],
	isSymbol: [Symbol('symbol'), Symbol.iterator],
	isUndefined: [undefined],
};
const keys = Object.keys(types);

test('Primitive - exports', (t) => {
	t.deepEqual(Object.keys(Primitive), keys, `exports ${keys.join(', ')}`);
	keys.forEach((key) => {
		t.equal(typeof Primitive[key], 'function', `${key} is a function`);
	});

	t.end();
});

keys.forEach((type) => {
	test(`Primitive - ${type}`, (t) => {
		const name = type.slice(2);
		const rest = keys.filter((key) => key !== type);

		t.ok(types[type].every((v) => Primitive[type](v)), `${name} values match`);
		t.ok(rest.every((key) => types[key].every((v) => !Primitive[type](v))), `other value types do not match`);

		t.end();
	});
});
