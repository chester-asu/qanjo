import * as Joi from '@hapi/joi';

export const registerSchema: Joi.ObjectSchema = Joi.object().keys({
  username: Joi.string(),
  password: Joi.string(),
  email: Joi.string().email(),
});
