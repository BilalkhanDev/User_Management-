
const Joi =require("joi")
 const userRegister=Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().allow(null, "").optional().empty(""),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword:Joi.string().allow(null, "").optional().empty(""),
    role:Joi.number().required().valid(0, 1,2),
})
module.exports={
    userRegister
}