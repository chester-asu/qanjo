import * as Joi from '@hapi/joi';

export const createSongSchema: Joi.ObjectSchema = Joi.object().keys({
  title: Joi.string().required(),
  bandID: Joi.number().required(),
  key: Joi.string(),
});
