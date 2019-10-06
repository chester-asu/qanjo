import * as Joi from '@hapi/joi';

export const createMembershipSchema: Joi.ObjectSchema = Joi.object().keys({
  userID: Joi.number(),
  bandID: Joi.number(),
});
