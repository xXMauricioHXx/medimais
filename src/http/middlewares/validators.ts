import { Request, Response, NextFunction } from "express";
import Joi from '@hapi/joi';

export const validatorMiddleware = (schema: Joi.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req, {
            abortEarly: false,
            stripUnknown: true,
            allowUnknown: true,
        });
        
        if (validation.error) {
            return next(new Error(`Validation Error - ${validation.error.details}`));           
        }
        return next();
    }
}