"use strict";
import Joi from "joi";

const batch_validation = Joi.object({
  batch: Joi.string()
    .pattern(/^(1[0-9]|20|[1-9])$/)  
    .required()
});

export { batch_validation };

