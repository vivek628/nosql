const express=require('express')
const Route=express.Router()
const {fetchAll,getProduct, postOrder, getOrders,orders}=require('../controllers/shopcontrollers')
Route.get('/fetchall',fetchAll)
Route.get('/getproduct/:ProductId',getProduct)
Route.post('/postorder',postOrder)
Route.get('/displayorders',getOrders)
Route.get('/orders',orders)

module.exports=Route