require("dotenv").config();
const UserModal = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const registerCustomer = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role } =
      req.body;

    // Check if user with the same email already exists
    const userEmail = await UserModal.findOne({ email: email });

    if (userEmail) {
      return res.status(400).json({ message: "User already registered" });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModal.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      role: role,
    });
    await newUser.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const signinCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await UserModal.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email/password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email/password" });
    }

    const token = jwt.sign(
      { userId: user._id, userRole: user.role },
      secret_key,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.error("Error in Login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res, next) => {
  const userId = req.userId;
  const { page, limit } = req.query;

  // Convert page and limit to integers (default to 1 if not provided)
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10; // Default limit to 10 if not provided

  try {
    // Fetch user role based on userId
    const userRole = await UserModal.findById(userId);

    // Fetch all users
    let allUsers = await UserModal.find();

    if (allUsers.length >= 1) {
      let filteredUsers;
      let totalCount;
      let totalPages;

      if (userRole.role === 2) {
        // Filter users based on role === 3
        filteredUsers = allUsers.filter((item) => item.role === 3);
      } else {
        // Filter users based on role !== 1
        filteredUsers = allUsers.filter(
          (item) => item._id.toString() !== userId
        );
      }

      // Calculate total count and total pages
      totalCount = filteredUsers.length;
      totalPages = Math.ceil(totalCount / limitNumber);

      // Apply pagination using slice
      filteredUsers = filteredUsers.slice(
        (pageNumber - 1) * limitNumber,
        pageNumber * limitNumber
      );

      return res.status(200).json({
        currentPage: pageNumber,
        totalItems: totalCount,
        totalPages: totalPages,
        users: filteredUsers,
      });
    } else {
      return res.status(200).json({ message: "No Data" });
    }
  } catch (error) {
    console.error("Error in retrieving users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getSingleUser=async(req,res)=>{

  const {id}=req.params
  try{
    const user=await UserModal.findOne({_id:id})
    if(!user){
     return res.status(400).json({message:"No user avaible"})
    }

      return res.status(200).json({user})
      
 }
 catch(error){
   return res.status(400).json({
     error:"Internal server error"
   })
 }

}
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const userRole = req.userRole;
  const { firstName, lastName, role } = req.body;
  if (!id) {
    return res.status(400).json({ error: "User Id must me required" });
  }
  try {
    const user = await UserModal.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ error: "User not Found" });
    }
    let updatedRole = user.role;
    if (userRole === 2) {
      if (role === 2 || role === 3) {
        updatedRole = role;
      } else {
        return res
          .status(400)
          .json({ error: "Managers can only update role to 2 or 3" });
      }
    } else {
      updatedRole = role;
    }
    const updateFields = {
      role: updatedRole,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
    };

    // Update the user with the defined updateFields
    await UserModal.updateOne({ _id: id }, updateFields);

    const updatedUserData = await UserModal.findOne({ _id: id });
    res.status(200).json(updatedUserData);
  } catch (error) {
    console.error("Error in updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const userRole=req.userRole
  if(userRole === 3){
    return res.status(400).json({ error: "Customer has no permissions to delete" });
  }
  if (!id) {
    return res.status(400).json({ error: "User Id must me required" });
  }
  try {
  
    const user = await UserModal.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ error: "User not Found" });
    }
    if (userRole === 2){
        if(user.role ===1 || user.role===2){
            return res.status(400).json({error:"Manger cannot Delete admin or manger"})
        }
        else{
            await UserModal.deleteOne({_id:id})
            res.status(200).json({message:`user ${id} removed successfully`})
        }
    }
    else{
        await UserModal.deleteOne({_id:id})
        res.status(200).json({message:`user ${id} removed successfully`})
    }

  } catch (error) {
    console.error("Error in updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const updateProfile=async(req,res)=>{
  const {id}=req.params;
  const { firstName, lastName, email,password } = req.body;
  if (!id) {
    return res.status(400).json({ error: "User Id must me required" });
  }
  try{
    const user = await UserModal.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ error: "User not Found" });
    }
  await UserModal.updateOne({
    firstName:user.firstName || firstName,
    email:user.email || email,
    lastName:user.lastName || lastName,
    password:user.password || password,

  })
  return res.status(200).json({ user });
  }
  catch(error){
    console.error("Error in updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  registerCustomer,
  signinCustomer,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateProfile
};
