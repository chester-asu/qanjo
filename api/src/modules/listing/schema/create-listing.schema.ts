import * as Joi from '@hapi/joi';

export const createListingSchema: Joi.ObjectSchema = Joi.object().keys({
  songID: Joi.number().required(),
  setlistID: Joi.number().required(),
});
