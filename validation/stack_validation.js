import Joi from 'joi';

const stack_validation = Joi.object({
  stack: Joi.string()
  .pattern(new RegExp(/^[a-zA-Z\s]+$/))
  .min(2)  
    .max(10)  
    .required()  
   
});

export  {stack_validation};
