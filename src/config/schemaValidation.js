
const Joi =require("joi")
 const userRegister=Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().allow(null, "").optional().empty(""),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword:Joi.string().allow(null, "").optional().empty(""),
    role:Joi.number().required().valid(2,3),
})
const userSignin=Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})
const allUsers=Joi.object().keys({
    
    page: Joi.number().required(),
    limit: Joi.number().min(5).required(),
})


module.exports={
    userRegister,
    userSignin,
    allUsers
}