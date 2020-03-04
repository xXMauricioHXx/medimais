import Joi = require("@hapi/joi");

export const listMedicines = Joi.object({
    query: Joi.object({
        min: Joi.number(),
        max: Joi.number(),
    }),
});