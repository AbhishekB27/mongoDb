const mongoose = require('mongoose')
const shortId = require('shortid')
const productSchema = new mongoose.Schema({
    productOwner:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productBrand:{
        type:String,
        required:true
    },
    productDescription:{
        type:String
    },
    productPrice:{
        type:Number
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
    productCode:{
        type:String,
        default:shortId.generate,
    }
})

const Product = mongoose.model('Products',productSchema);
module.exports = Product