const mongoose = require('mongoose')
const shortId = require('shortid')
const bcrypt = require('bcryptjs')


const studentSchema = new mongoose.Schema({
    studentId:{
        type:String,
        default:shortId.generate
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:Number,
        unique:true,
        required:true
    },
    address:{
        type:'String'
    }
})
studentSchema.pre('save',function(next){
    const {password} = this;
    this.password = bcrypt.hash(password,10)
    console.log(this)
    next()
})
const Student = new mongoose.model('Students',studentSchema);
module.exports = Student