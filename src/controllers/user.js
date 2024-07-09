const registerCustomer=(req,res,next)=>{
    console.log("Bilal")
    res.status(200).json({message:"Bilal"})
    next()
}
module.exports={registerCustomer}