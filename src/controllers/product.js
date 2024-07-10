require("dotenv").config();
const ProductModal = require("../models/productSchema");

const addProduct = async (req, res) => {
  const userRole = req.userRole;
  const userId = req.userId;
  const { title, desc, price } = req.body;
  try {
    if (userRole === 3) {
      return res.status(400).json({ error: "Customer cannot add product" });
    }
    const product = await ProductModal.create({
      title,
      desc,
      price,
      createdBy:userId
    });
    await product.save();
    return res.status(200).json({
         message: "Product added successfully" 
        });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addProduct,
};
