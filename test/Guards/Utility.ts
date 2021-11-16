import test from 'tape';
import * as Utilities from '../../source/Guards/Utility';

const types = {
	bigint: [BigInt('12345678901234567890')],
	boolean: [true, false],
	function: [() => { }, function () { }],
	number: [1, Math.PI, Infinity, NaN, 1_000],
	object: [{}, [], /^$/, new Date()],
	string: ['one', 'two'],
	symbol: [Symbol('symbol'), Symbol.iterator],
	undefined: [undefined],
};
const keys = Object.keys(types);

const isDateInYear2000 = (date: Date) => date.getFullYear() === 2000;
const isDateInNovember = (date: Date) => date.getMonth() === 10;

test('Utility - exports', (t) => {
	const expect = ['is', 'any', 'all', 'not'];

	t.deepEqual(Object.keys(Utilities), expect, `exports ${expect.join(', ')}`);
	expect.forEach((key) => {
		t.equal(typeof Utilities[key], 'function', `${key} is a function`);
	});

	t.end();
});

keys.forEach((type) => {
	const validator = Utilities.is(type as any);
	test(`Utility/is - ${type}`, (t) => {
		const rest = keys.filter((key) => key !== type);

		t.ok(types[type].every(validator), `${type} values match`);
		t.ok(rest.every((key) => types[key].every((v) => !validator(v))), `other value types do not match`);

		t.end();
	});
});


test('Utility/any', (t) => {
	const validate = Utilities.any(isDateInYear2000, isDateInNovember);

	t.ok(validate(new Date('2000-11-11')), '2000-11-11 matches any(isDateInYear2000, isDateInNovember)');
	t.ok(validate(new Date('2000-04-01')), '2000-04-01 matches any(isDateInYear2000, isDateInNovember)');
	t.ok(validate(new Date('2020-11-11')), '2020-11-11 matches any(isDateInYear2000, isDateInNovember)');
	t.notOk(validate(new Date('2020-04-01')), '2020-04-01 does not match any(isDateInYear2000, isDateInNovember)');

	t.end();
});

test('Utility/all', (t) => {
	const validate = Utilities.all(isDateInYear2000, isDateInNovember);

	t.ok(validate(new Date('2000-11-11')), '2000-11-11 matches all(isDateInYear2000, isDateInNovember)');
	t.notOk(validate(new Date('2000-04-01')), '2000-04-01 does not match all(isDateInYear2000, isDateInNovember)');
	t.notOk(validate(new Date('2020-11-11')), '2020-11-11 does not match all(isDateInYear2000, isDateInNovember)');
	t.notOk(validate(new Date('2020-04-01')), '2020-04-01 does not match all(isDateInYear2000, isDateInNovember)');

	t.end();
});

test('Utility/not', (t) => {
	const validate = Utilities.not(isDateInYear2000, isDateInNovember);

	t.notOk(validate(new Date('2000-11-11')), '2000-11-11 does not match not(isDateInYear2000, isDateInNovember)');
	t.notOk(validate(new Date('2000-04-01')), '2000-04-01 does not match not(isDateInYear2000, isDateInNovember)');
	t.notOk(validate(new Date('2020-11-11')), '2020-11-11 does not match not(isDateInYear2000, isDateInNovember)');
	t.ok(validate(new Date('2020-04-01')), '2020-04-01 matches not(isDateInYear2000, isDateInNovember)');

	t.end();
});
