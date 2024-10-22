const express=require('express')
const Route=express.Router()
const {fetchAll,getProduct}=require('../controllers/shopcontrollers')
Route.get('/fetchall',fetchAll)
Route.get('/getproduct/:ProductId',getProduct)
module.exports=Route