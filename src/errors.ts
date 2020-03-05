import Joi = require('@hapi/joi');

export abstract class CodedError extends Error {
  constructor(message: string, protected code: string) {
    super(message);
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}

export abstract class DetailedCodedError extends CodedError {
  details: Object;

  constructor(code: string, message: string, details: Object) {
    super(code, message);
    this.details = details;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}

export class ValidationError extends DetailedCodedError {
  constructor(details: Joi.ValidationErrorItem[]) {
    super('VALIDATION_FAILED', 'Invalid request data', details);
  }
}

export class NotFoundError extends CodedError {
  constructor() {
    super('NOT_FOUND', 'Page not found');
  }
}
