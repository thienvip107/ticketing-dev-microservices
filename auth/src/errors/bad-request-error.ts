import {CustomError} from './custom-error'


export class BadRequestError extends CustomError {
	statusCode = 400;
	reason = 'Email is already used'

	constructor() {
		super('Email is already used')

		Object.setPrototypeOf(this, BadRequestError.prototype)
	}

	serializeErrors() {
		return [{message: this.reason}]
	}
}