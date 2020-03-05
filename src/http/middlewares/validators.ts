import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import { ValidationError } from '../../errors';

export const validatorMiddleware = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      return next(new ValidationError(validation.error.details));
    }
    return next();
  };
};
