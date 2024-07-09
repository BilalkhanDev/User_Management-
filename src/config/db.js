const mongoose=require("mongoose");
const AdminSeed = require("../seeders/admin");
const connectDB =() => {
  mongoose.set('strictQuery', true);
  const uri = process.env.MONGODB_URL; // MongoDB URI
  mongoose.connect(`${uri}/Assignment`)
    .then(() => 
    {
      console.log('Connected to MongoDB')
      AdminSeed(null, null, () => {});
    }
  )
    .catch((err) => {
      console.error('Failed to connect to MongoDB');
      console.error(err);
    });
};

module.exports= connectDB;
