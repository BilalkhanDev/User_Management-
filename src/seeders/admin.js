const user=require('../models/userSchema')
const bcrypt=require("bcrypt")
const AdminSeed=async(req,res,next)=>{
 const IsAdmin=await user.findOne({role:1})
 if (!IsAdmin){
    const hashedNumber = await bcrypt.hash(`${12345678}`, 1);
    const admin=await user.create({
        firstName:"Admin",
        email:"admin@gmail.com",
        password:hashedNumber,
        role:1
    })
  await admin.save()
  next();
 }
 else{
    next();
 }
}
module.exports=AdminSeed