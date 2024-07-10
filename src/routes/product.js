const { addProduct, getallProduts, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/product");
const { verifyToken ,validator} = require("../middlewares/reqValidator");

const Router = require("express").Router();
Router.post(
    "/prod/add_Product",
    validator("addProduct", "body"),
    verifyToken,
    addProduct
    
)
Router.get(
    "/prod/get_all_Product",
    verifyToken,
    getallProduts
)

Router.get(
    "/prod/get_Product/:id",
    verifyToken,
    getSingleProduct
)
Router.patch(
    "/prod/update_Product/:id",
    verifyToken,
    validator("updateProduct", "body"),
    updateProduct
)
// Delete product , Only admin can delete the product
Router.delete(
    "/prod/delete_Product/:id",
    verifyToken,
    deleteProduct
)

module.exports = Router;
