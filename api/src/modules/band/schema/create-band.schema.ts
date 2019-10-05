import * as Joi from '@hapi/joi';

export const createBandSchema: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string()
    .max(140)
    .required(),
});
