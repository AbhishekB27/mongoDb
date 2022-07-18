const express = require('express')
const router = express.Router();
const Employee = require('../model/employee')
const bcrypt = require('bcryptjs')
const jwtAuth = require('../helper/jwtAuth')
const isAuthorised = require('../middleware/index')
const fs = require('fs');
const path = require('path');


router.post('/signUp',async(req,res)=>{
   try {
    const {empName,empEmail,empPassword,job,hireDate,salary}= req.body;
    const employeeData = new Employee({empName,empEmail,empPassword,job,hireDate,salary})
    const oldUser =await Employee.findOne({empEmail})
    if(!(empName&&empEmail&&empPassword)){
        return res.status(404).send("All inputs required")
    }
    if(oldUser){
       return res.status(404).send('User Already Exist...')
    }
    await employeeData.save()
    res.send(employeeData)
    console.log("Data Successfully Added To Database...")
   } catch (error) {
    res.status(404).send(error.message)
   }
})
router.post('/signIn',async(req,res)=>{
   try {
    const {empEmail,empPassword} = req.body
    if(!(empEmail&&empPassword)){
        return res.status(401).send("All inputs are required...")
    }
    const employee =await Employee.findOne({empEmail})
    const isValid = await bcrypt.compare(empPassword,employee.empPassword)
        if(employee && isValid){
            const token = jwtAuth.createjwt({empName:employee.empName,empEmail:employee.empEmail})
            employee.token= token
            return res.status(200).send(employee)
        }
        else{
            return res.status(404).send("invalid credentials")
        }
   } catch (error) {
    return res.status(404).send(error.message)
   }
})
router.get('/Users',isAuthorised,async (req,res)=>{
    try {
        const data = fs.readFileSync(path.join(path.resolve(),'user.json'),{encoding:'utf-8'})
        console.log(path.resolve())
        res.send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports= router