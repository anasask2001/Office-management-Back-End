import Joi from 'joi';

const role_validation = Joi.object({
  roles: Joi.string()
  .pattern(new RegExp(/^[a-zA-Z\_]+$/))
  .min(1)  
    .max(20)  
    .required()  
   
});

export  {role_validation}
