import * as Joi from '@hapi/joi';

export const createMembershipSchema: Joi.ObjectSchema = Joi.object().keys({
  userID: Joi.number().required(),
  bandID: Joi.number().required(),
});
