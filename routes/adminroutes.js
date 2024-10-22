const express=require('express')
const Route=express.Router()
const {postProduct,productpage,fetchAll,getProduct,editProduct, postEditproduct, deleteById}=require('../controllers/admincontrollers')
const {home}=require('../controllers/usercontrollers')
Route.post('/postProduct',postProduct)
Route.get('/productpage',productpage)
Route.get('/products',fetchAll)
Route.get('/getproduct/:ProductId',getProduct)
Route.get('/edit/:ProductId',editProduct)
Route.get('/homeedit/:ProductId',home)
Route.post('/posteditproduct',postEditproduct)
Route.get('/deleteProduct/:productId',deleteById)

module.exports=Route