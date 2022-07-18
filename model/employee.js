const mongoose = require('mongoose')
const shortId = require('shortid')
const bcrypt = require('bcryptjs')

const employeeSchema = new mongoose.Schema({
    empCode:{
        type:String,
        default:shortId.generate,
        required:true,
        unique:true
    },
    empName:{
        type:String,
        required:true
    },
    empEmail:{
        type:String,
        required:true,
        unique:true
    },
    empPassword:{
        type:String,
        required:true,
        unique:true
    },
    job:{
        type:String,
        required:true
    },
    hireDate:{
        type:Date,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    token:{
        type:String
    }
},{timestamps:true})

employeeSchema.pre('save',function(next){
    const {empPassword} = this
   const encryptedPass = this.empPassword = bcrypt.hashSync(empPassword,10)
    console.log("password encrypted successfully :" + encryptedPass)
    next()
})
const Employee = mongoose.model('Employee',employeeSchema)
module.exports = Employee