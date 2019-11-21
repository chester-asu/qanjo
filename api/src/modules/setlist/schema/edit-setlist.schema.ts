import * as Joi from '@hapi/joi';

export const editSetlistSchema: Joi.ObjectSchema = Joi.object().keys({
  title: Joi.string().required()
});
