import * as joi from 'joi'


export const envSchema=joi.object({
    NODE_ENV: joi.string().valid("development",'production','test').default('development'),
    PORT:joi.number().required().integer(),

    //Database configuration
    DATABASE_URL:joi.string().required(),

    // Nats configuration
    NATS_URL:joi.string().required(),
  
   
})

