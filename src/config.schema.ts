import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000).required(),
  NODE_ENV: Joi.string().required(),
});
