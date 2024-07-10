const Router = require("express").Router();
const{ 
    registerCustomer,
     signinCustomer, 
     getAllUsers, 
     updateUser,
     deleteUser } =require("../controllers/user");
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
Router.patch(
    "/user/update_user/:id",
    validator("updateUser", "body"),
    verifyToken,
    updateUser
)
Router.delete(
    "/user/delete_user/:id",
    verifyToken,
    deleteUser
)
// 


module.exports = Router;
