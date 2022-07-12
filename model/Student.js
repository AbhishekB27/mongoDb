const { timeStamp } = require('console')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    age: {
        type:Number,
        required:true,
    },
    password:{
        type:String
    }
},{timestamps:true})

studentSchema.pre('save',function(next){
    const {password} = this
    this.password = bcrypt.hashSync(password,10)
    // console.log(this)
    next()
})

const Student = mongoose.model("Student",studentSchema);

module.exports = Student