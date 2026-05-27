import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  APP_URL: Joi.string().uri().required(),
  FRONTEND_URL: Joi.string().uri().required(),

  DATABASE_URL: Joi.string().required(),

  GOOGLE_CLIENT_ID: Joi.string().optional().default(''),
  GOOGLE_CLIENT_SECRET: Joi.string().optional().default(''),
  GOOGLE_CALLBACK_URL: Joi.string().uri().required(),

  JWT_ACCESS_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  INSFORGE_S3_ENDPOINT: Joi.string().uri().required(),
  INSFORGE_S3_REGION: Joi.string().required(),
  INSFORGE_S3_ACCESS_KEY_ID: Joi.string().required(),
  INSFORGE_S3_SECRET_ACCESS_KEY: Joi.string().required(),
  INSFORGE_S3_BUCKET_AVATARS: Joi.string().required(),
  INSFORGE_PUBLIC_STORAGE_URL: Joi.string().uri().required(),

  THROTTLE_TTL: Joi.number().default(60000),
  THROTTLE_LIMIT: Joi.number().default(100),

  CORS_ORIGINS: Joi.string().required(),
});
