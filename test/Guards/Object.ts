import test from 'tape';
import { isBoolean, isNumber, isString } from '../../source/Guards/Primitive';
import { any } from '../../source/Guards/Utility';
import * as Objects from '../../source/Guards/Object';

test('Object - exports', (t) => {
	const expect = ['isKey', 'isKeyOfType', 'isOptionalKeyOfType', 'isStructure', 'isInstanceOf'];

	t.deepEqual(Object.keys(Objects), expect, `exports ${expect.join(', ')}`);
	expect.forEach((key) => {
		t.equal(typeof Objects[key], 'function', `${key} is a function`);
	});

	t.end();
});

test('Object - isKey', (t) => {
	const foo = Objects.isKey('foo');

	t.notOk(foo("foo"), '"foo" does not contain key "foo"');
	t.notOk(foo(123), '123 does not contain key "foo"');
	t.notOk(foo({}), '{} does not contain key "foo"');
	t.notOk(foo({ bar: 1 }), '{bar:1} does not contain key "foo"');
	t.notOk(foo(new Date()), 'Date does not contain key "foo"');

	t.ok(foo({ foo: undefined }), '{foo:undefined} contains key "foo"');
	t.ok(foo({ foo: false }), '{foo:false} contains key "foo"');
	t.ok(foo({ foo: true }), '{foo:true} contains key "foo"');
	t.ok(foo({ foo: null }), '{foo:null} contains key "foo"');
	t.ok(foo({ foo: 1 }), '{foo:1} contains key "foo"');
	t.ok(foo({ foo: "bar" }), '{foo:"bar"} contains key "foo"');
	t.ok(foo({ foo: [] }), '{foo:[]}} contains key "foo"');

	t.end();
});

test('Object - isKeyOfType', (t) => {
	const foo = Objects.isKeyOfType('foo', any(isString, isBoolean));

	t.notOk(foo("foo"), '"foo" does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo(123), '123 does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo({}), '{} does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo({ bar: 1 }), '{bar:1} does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo(new Date()), 'Date does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo({ foo: undefined }), '{foo:undefined} does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo({ foo: null }), '{foo:null} does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo({ foo: 1 }), '{foo:1} does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo({ foo: [] }), '{foo:[]}} does not contain key "foo" with type isString or isBoolean');

	t.ok(foo({ foo: false }), '{foo:false} contains key "foo" with type isString or isBoolean');
	t.ok(foo({ foo: true }), '{foo:true} contains key "foo" with type isString or isBoolean');
	t.ok(foo({ foo: "bar" }), '{foo:"bar"} contains key "foo" with type isString or isBoolean');

	t.end();
});

test('Object - isOptionalKeyOfType', (t) => {
	const foo = Objects.isOptionalKeyOfType('foo', any(isString, isBoolean));

	t.notOk(foo("foo"), '"foo" does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo(123), '123 does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo({ foo: undefined }), '{foo:undefined} does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo({ foo: null }), '{foo:null} does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo({ foo: 1 }), '{foo:1} does not contain key "foo" with type isString or isBoolean');
	t.notOk(foo({ foo: [] }), '{foo:[]}} does not contain key "foo" with type isString or isBoolean');

	t.ok(foo({ bar: 1 }), '{bar:1} does not contain key "foo" with type isString or isBoolean');
	t.ok(foo(new Date()), 'Date does not contain key "foo" with type isString or isBoolean');
	t.ok(foo({}), '{} does not contain key "foo" with type isString or isBoolean');
	t.ok(foo({ foo: false }), '{foo:false} contains key "foo" with type isString or isBoolean');
	t.ok(foo({ foo: true }), '{foo:true} contains key "foo" with type isString or isBoolean');
	t.ok(foo({ foo: "bar" }), '{foo:"bar"} contains key "foo" with type isString or isBoolean');

	t.end();
});

test('Object - isStructure {foo:<string>,bar:<number>,baz:<number|boolean>}', (t) => {
	const struct = Objects.isStructure({ foo: isString, bar: isNumber, baz: any(isNumber, isBoolean) });

	t.notOk(struct({}), '{} does not match structure');
	t.notOk(struct({ foo: 'foo' }), `{foo: 'foo'} does not match structure`);
	t.notOk(struct({ foo: 'foo', bar: 123, baz: 'baz' }), `{foo: 'foo', bar: 123, baz: 'baz'} does not match structure`);
	t.notOk(struct({ foo: 'foo', bar: 123 }), `{foo: 'foo', bar: 123} matches structure`);

	t.ok(struct({ foo: 'foo', bar: 123, baz: 345 }), `{foo: 'foo', bar: 123, baz: 345} matches structure`);
	t.ok(struct({ foo: 'foo', bar: 123, baz: false }), `{foo: 'foo', bar: 123, baz: false} matches structure`);
	t.ok(struct({ foo: 'foo', bar: 123, baz: true, qux: 'ignored' }), `{foo: 'foo', bar: 123, baz: true} matches structure`);

	t.end();
});

test('Object - isStructure {foo:<string>,bar:<number>,baz?:<number|boolean>}', (t) => {
	const struct = Objects.isStructure({ foo: isString, bar: isNumber, baz: any(isNumber, isBoolean) }, ['baz']);

	t.notOk(struct({}), '{} does not match structure');
	t.notOk(struct({ foo: 'foo' }), `{foo: 'foo'} does not match structure`);
	t.notOk(struct({ foo: 'foo', bar: 123, baz: 'baz' }), `{foo: 'foo', bar: 123, baz: 'baz'} does not match structure`);

	t.ok(struct({ foo: 'foo', bar: 123 }), `{foo: 'foo', bar: 123} matches structure`);
	t.ok(struct({ foo: 'foo', bar: 123, baz: 345 }), `{foo: 'foo', bar: 123, baz: 345} matches structure`);
	t.ok(struct({ foo: 'foo', bar: 123, baz: false }), `{foo: 'foo', bar: 123, baz: false} matches structure`);
	t.ok(struct({ foo: 'foo', bar: 123, baz: true, qux: 'ignored' }), `{foo: 'foo', bar: 123, baz: true} matches structure`);

	t.end();
});

test('Object - isInstanceOf', (t) => {
	const isDate = Objects.isInstanceOf(Date);
	const isRegex = Objects.isInstanceOf(RegExp);

	t.ok(isDate(new Date()), 'new Date() is a Date');
	t.notOk(isDate(/^$/), '/^$/ is not a Date');
	t.notOk(isRegex(new Date()), 'new Date() is a RegExp');
	t.ok(isRegex(/^$/), '/^$/ is not a RegExp');

	t.end();
});
