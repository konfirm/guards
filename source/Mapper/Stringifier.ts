import { isArray, isNULL } from "../main";

export type Mapping = { match: (value: any) => boolean, map: (value: any) => string }

export class Stringifier {
	private typing: Array<(value: any) => string | undefined> = [
		(value: any) => value instanceof Date ? 'date' : undefined,
		(value: any) => value instanceof RegExp ? 'regexp' : undefined,
		(value: any) => isArray(value) ? 'array' : undefined,
		(value: any) => isNULL(value) ? 'null' : undefined,
		(value: any) => typeof value,
	];

	private string(value: string): string {
		return value ? `"${value}"` : '<empty string>';
	}

	private date(value: Date): string {
		return this.string(value.toISOString());
	}

	private object(value: object): string {
		const string = String(value);

		if (/^\[([a-z]+) \1\]$/i.test(string)) {
			const mapped = Object.keys(value)
				.map((key) => `${key}:${this.map(value[key])}`);
			return `{${mapped.join(',')}}`;
		}

		return string;
	}

	private array(value: Array<unknown>): string {
		const mapped = value
			.map((value) => this.map(value));

		return `[${mapped.join(',')}]`;
	}

	private null(): string {
		return 'NULL';
	}

	private undefined(): string {
		return 'undefined';
	}

	private function(value: Function): string {
		const pattern = /^(?:(class|function) )?([a-z][\w\d]*)?\s*[\(\{]/i;
		const [, type, name] = value.toString().match(pattern) as RegExpMatchArray;

		return type
			? name
				? `${type} ${name}`
				: `anonymous ${type}`
			: 'arrow function';
	}

	map(value: any): string {
		const type = this.typing.reduce((carry: string | undefined, type) => carry || type(value), undefined);

		return typeof this[type] === 'function'
			? this[type](value)
			: value.toString()
	}
}
