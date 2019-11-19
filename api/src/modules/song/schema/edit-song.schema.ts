import * as Joi from '@hapi/joi';

export const editSongSchema: Joi.ObjectSchema = Joi.object().keys({
  title: Joi.string(),
  key: Joi.string(),
  id: Joi.number().required()
});
