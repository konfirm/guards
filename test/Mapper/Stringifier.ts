import test from 'tape';
import each from 'template-literal-each';
import * as Export from '../../source/Mapper/Stringifier';

test('Mapper/Stringifier - exports', (t) => {
	const expect = ['Stringifier'];

	t.deepEqual(Object.keys(Export), expect, `exports ${expect.join(', ')}`);
	expect.forEach((key) => {
		t.equal(typeof Export[key], 'function', `${key} is a function`);
	});

	t.end();
});

const { Stringifier } = Export;

const stringifier = new Stringifier();

test('Mapper/Stringify - map', (t) => {
	class Stringable {
		toString() {
			return 'Stringable';
		}
	}

	class NotStringable {
		key = 'value';
	}

	each`
		input                                   | output                     | description
		----------------------------------------|----------------------------|-------------
		${''}                                   | <empty string>             |
		string                                  | "string"                   |
		${1234}                                 | 1234                       |
		${Infinity}                             | Infinity                   |
		${-Infinity}                            | -Infinity                  |
		${true}                                 | true                       |
		${false}                                | false                      |
		${undefined}                            | undefined                  |
		${null}                                 | NULL                       |
		${Symbol('sym')}                        | Symbol(sym)                | Symbol('sym')
		${new Date('2020-02-20T20:02:20.202Z')} | "2020-02-20T20:02:20.202Z" | new Date('2020-02-20T20:02:20.202Z')
		${/[a-z]/gi}                            | /[a-z]/gi                  |
		${[1, 'foo', false, null]}              | [1,"foo",false,NULL]       | [1, 'foo', false, null]
		${{ foo: 1, bar: true, baz: 'qux' }}    | {foo:1,bar:true,baz:"qux"} | {foo: 1, bar: true, baz: 'qux'}
		${new Stringable()}                     | Stringable                 | new Stringable()
		${new NotStringable()}                  | {key:"value"}              | new NotStringable()
		${class MyClass { }}                    | class MyClass              |
		${class { }}                            | anonymous class            |
		${() => { }}                            | arrow function             |
		${function () { }}                      | anonymous function         |
		${function myFunction() { }}            | function myFunction        |
	`(({ input, output, description = input }: any) => {
		t.equal(stringifier.map(input), output, `${description} is ${output}`)
	});

	t.equal

	t.end();
});

