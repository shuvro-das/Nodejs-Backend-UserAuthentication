//Validation 
const joi = require('@hapi/joi');



// Register validation
const registerValidation = (data) => {
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    
         
    });
    return schema.validate(data);
}



const LoginValidation = (data) => {
    const schema = joi.object({
        
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    
         
    });
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.LoginValidation = LoginValidation;
