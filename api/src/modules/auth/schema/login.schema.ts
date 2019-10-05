import * as Joi from '@hapi/joi';

export const loginSchema: Joi.ObjectSchema = Joi.object().keys({
  username: Joi.string(),
  password: Joi.string(),
});