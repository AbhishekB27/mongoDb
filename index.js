const express = require('express')
const app = express()
const { connectDb } = require('./helpers/database')
const Product = require('./model/Product')
app.use(express.json())

connectDb()

//create product
app.post('/product',async (req,res)=>{
  try {
    const { productOwner,productName,productBrand,productDescription,productPrice } = req.body
    const product = new Product({ productOwner,productName,productBrand,productDescription,productPrice  });
    await product.save();
    res.send(product)
    console.log('Product Save successfully.')
  } catch (error) {
    res.send(error.message)
  }
})
app.get('/product',async (req,res)=>{
  const product = await Product.find()
  //get a product where price of product is less than 30000
  // const product = await Product.find({productPrice:{$lt : 30000}})
  // const product = await Product.find({productBrand:{$in:["oneplus"]}})
  res.send(product)
})
app.put('/product',async(req,res)=>{
  try {
    const {id} = req.body
  console.log(id)
  const updateProduct = await Product.updateOne({_id:id},{$set: {productOwner:"Deepak Singh Rawat"}})
  res.send(updateProduct)
  console.log('successfully updated...')
  } catch (error) {
    res.send(error.message)
  }
});
//delete document by id
app.delete('/product',async (req,res)=>{
 try {
  const {id} = req.body
  const deletedDocument = await Product.deleteOne({_id:id})
  console.log(deletedDocument)
  deletedDocument.deletedCount === 1 ? res.send("Successfully Deleted.."):res.send("Something went wrong...")
 } catch (error) {
  res.send(error.message)
 }
})
app.listen(8080,()=>{
  console.log("Server is run on port " + 8080)
})