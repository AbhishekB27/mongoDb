const express = require('express')
const { connectDb } = require('./helpers/database')
const Student = require('./model/Student')
const app = express()
app.use(express.json())

connectDb()
app.post('/',async(req,res)=>{
   try {
   const {name,email,age,password} = req.body
   const student = new Student({name,email,age,password})
   await student.save()
  //  console.log(student)
    res.send(student)
   } catch (error) {
    res.send(error.message)
   }
})
app.get('/',async(req,res)=>{
  try {
    const {name} = req.body
    const student = await Student.find({name:name})
    student.length > 0 ? res.send(student) : res.send("Student Does not Exist.") 
  } catch (error) {
   res.send(error.message)
  }
})
app.listen(8080,()=>{
    console.log("server is running on port 8080")
});