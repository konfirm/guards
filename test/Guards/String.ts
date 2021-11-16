import test from 'tape';
import * as Strings from '../../source/Guards/String';

test('String - exports', (t) => {
	const expected = ['isStringWithPattern'];

	t.deepEqual(Object.keys(Strings), expected, `exports ${expected.join(', ')}`);
	expected.forEach((key) => {
		t.equals(typeof Strings[key], 'function', `${key} is a function`);
	});

	t.end();
});

test('String - isStringWithPattern', (t) => {
	const isHello = Strings.isStringWithPattern(/^Hello/);

	t.ok(isHello('Hello World!'), '"Hello World!" matches isStringWithPattern(/^Hello/)');
	t.notOk(isHello('Greetings World!'), '"Greetings World!" does not match isStringWithPattern(/^Hello/)');
	t.notOk(isHello(123), '123 does not match isStringWithPattern(/^Hello/)');
	t.notOk(isHello(['Hello']), '["Hello"] does not match isStringWithPattern(/^Hello/)');

	t.end();
});
