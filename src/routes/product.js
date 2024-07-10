const { addProduct } = require("../controllers/product");
const { verifyToken ,validator} = require("../middlewares/reqValidator");

const Router = require("express").Router();
Router.post(
    "/prod/add_Product",
    validator("addProduct", "body"),
    verifyToken,
    addProduct
    
)
// 


module.exports = Router;
