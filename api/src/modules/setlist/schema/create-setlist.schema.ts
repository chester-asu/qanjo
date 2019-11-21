import * as Joi from '@hapi/joi';

export const createSetlistSchema: Joi.ObjectSchema = Joi.object().keys({
  title: Joi.string().required(),
  bandID: Joi.number().required(),
});
