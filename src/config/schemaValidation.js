
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

const updateUser=Joi.object().keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().allow(null, "").optional().empty(""),
    role:Joi.number().optional().valid(2,3)
})
// Product Validation 

const addProduct=Joi.object().keys({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    price:Joi.number().required(),
})
const updateProduct=Joi.object().keys({
    title: Joi.string().optional(),
    desc: Joi.string().optional(),
    price:Joi.number().optional(),
})

module.exports={
    userRegister,
    userSignin,
    allUsers,
    updateUser,
    addProduct,
    updateProduct

}