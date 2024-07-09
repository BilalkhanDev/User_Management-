const Router = require("express").Router();
const{ registerCustomer, signinCustomer, getAllUsers } =require("../controllers/user");
const  { validator, verifyToken } =require("../middlewares/reqValidator");

Router.post(
    "/user/register_customer",
    validator("userRegister", "body"),
    registerCustomer
)
Router.post(
    "/user/signin_customer",
    validator("userSignin", "body"),
    signinCustomer
)
Router.get(
    "/user/get_all_users",
    validator("allUsers", "query"),
    verifyToken,
    getAllUsers
)


module.exports = Router;
