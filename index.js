console.log("Hi")
const express = require('express')
const authRoutes = require('./router/auth')
const app = express();
app.use(express.json())
const connect = require('./config/database')

connect()

app.use('/auth',authRoutes)
app.listen(8080,()=>{
    console.log('server in running on ' + 8080)
})