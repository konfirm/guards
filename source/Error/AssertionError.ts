import { stringify } from "@konfirm/stringify";

export class AssertionError extends Error {
	constructor(message: string, public value: Array<any>, private trigger?: AssertionError) {
		super(message);

		Object.setPrototypeOf(this, new.target.prototype);
	}

	get reasons(): Array<string> {
		const { message, value, trigger } = this;

		return (trigger?.reasons || []).concat(`${stringify(value)} ${message}`);
	}

	get cause(): Array<{ value, message }> {
		const { message, value, trigger } = this;

		return [{ value, message }].concat(trigger?.cause || []);
	}

	get reason(): string {
		return String(this);
	}

	toString(separator: string = '\u200b\u2190\u200b'): string {
		return this.reasons
			.reverse()
			.join(separator);
	}
}
