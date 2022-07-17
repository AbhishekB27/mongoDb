const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bcrypt = require('bcryptjs')
const app = express()
const { connectDb } = require('./helpers/database')
const Student = require('./model/Student')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'./public')))
app.set("view engine","hbs")
app.set('views',path.join(__dirname,'./templates/views'))
hbs.registerPartials(path.join(__dirname,'./templates/partials'))


connectDb()

//create product
app.get('/',(req,res)=>{
  try {
    res.render("index")
  } catch (error) {
    res.send(error.message)
  }
})
app.get('/register',async (req,res)=>{
  try {
    res.render('register')
  } catch (error) {
    res.status(404).send(error.message)
  }
})
app.get('/login',(req,res)=>{
  try {
    res.render("login");
  } catch (error) {
    res.send(error.message)
  }
})
app.post('/register',async (req,res)=>{
  try {
  const {uName,uEmail,uPassword,uPhone,uAddress} = req.body
    const student = new Student({
      name:uName,
      email:uEmail,
      password:bcrypt.hashSync(uPassword,10),
      phoneNo:uPhone,
      address:uAddress
    })
    await student.save()
    res.status(201).render("index")
  } catch (error) {
    res.status(404).send(error.message)
  } 
})
//login
app.post('/login',async (req,res)=>{
  try {
    const {uEmail,uPassword} = req.body
    const studentData = await Student.findOne({email:uEmail})
    console.log(studentData)
    // console.log(uEmail + ":" + uPassword)
    // console.log(studentData.name + ":" + studentData.password)
    if(studentData === null){
      res.status(401).send("Email Doesn't match.")
    }
    else{
      const isValid = await bcrypt.compare(uPassword,studentData.password)
      if(isValid){
      res.status(201).send("Hello " + studentData.name)
     }
     else{
      res.status(401).send("Password does not match")
     }
   }
   
  } catch (error) {
    res.status(404).send(error.message)
  }
})
app.listen(8080,()=>{
  console.log("Server is run on port " + 8080)
})