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
const getallProduts=async(req,res)=>{
  try{
     const products=await ProductModal.find()
     if(products?.length >=1){
      return res.status(200).json({products:products})
     }
     else{
      return res.status(200).json({message:"No product avaible"})
     }
  }
  catch(error){
    return res.status(400).json({
      error:"Internal server error"
    })
  }
}
const getSingleProduct=async(req,res)=>{
  const{id}=req.params;
  try{
     const product=await ProductModal.findOne({_id:id})
     if(!product){
      return res.status(400).json({message:"No product avaible"})
     }
     else{
      return res.status(200).json({product})
     }
  }
  catch(error){
    return res.status(400).json({
      error:"Internal server error"
    })
  }
}
const updateProduct=async(req,res)=>{
  const userRole=req.userRole
  const {id}=req.params
  const {title,desc,price}=req.body
  try{
    
    if(userRole !== 1 || userRole !==2){
      return res.status(400).json({ error: "Customer cannot update product" });

    }
    const product=await ProductModal.findOne({_id:id})
    if(!product){
      return res.status(400).json({ error: "Product Not Found" });
    }
     await ProductModal.updateOne({
    title:product.title || title,
    desc:product.desc || desc,
    price:product.price || price
    })
    return res.status(200).json({product});
  }
  catch(error){
    return res.status(500).json({error:"Internal Server Error "})
  }
}
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const userRole=req.userRole
  if(userRole === 3 || userRole===2){
    return res.status(400).json({ error: "Customer/Manger has no permissions to delete product" });
  }
  if (!id) {
    return res.status(400).json({ error: "Id must me required" });
  }
  try {
  
    const user = await ProductModal.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ error: "Product not Found" });
    }

    else{
        await ProductModal.deleteOne({_id:id})
        res.status(200).json({message:`product ${id} removed successfully`})
    }

  } catch (error) {
    console.error("Error in updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addProduct,
  getallProduts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
