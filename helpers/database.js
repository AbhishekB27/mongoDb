const mongoose = require('mongoose')


const MONGO_URI = 'mongodb+srv://Abhishek2B27:abhishek@abhishekb27.tsydk.mongodb.net/test'

module.exports.connectDb = async ()=>{
    try {
       await mongoose.connect(MONGO_URI)
        console.log("Connected...")
    } catch (error) {
        console.log(error.message)
    }
}