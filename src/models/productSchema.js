const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    desc:{
        type: String,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
    // {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true }
    //   });
    //   userSchema.virtual("events", {
    //     ref: "Event",
    //     foreignField: "createdBy",
    //     localField: "_id"
    //   });
    createdBy:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:"User"
      
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
