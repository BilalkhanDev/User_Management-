const Router = require("express").Router();
const{ registerCustomer } =require("../controllers/user");
const  { validator, verifyToken } =require("../middlewares/reqValidator");

Router.get(
    "/user/register_customer",
    validator("userRegister", "body"),
    // verifyToken,
    registerCustomer

)

module.exports = Router;
