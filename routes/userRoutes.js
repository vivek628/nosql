const express=require('express')
const Route=express.Router()
const {home,products, addtocart,usercart, displayCart,postcartdeleteitem}=require('../controllers/usercontrollers')
Route.get('/',home)
Route.get('/userproduct',products)
Route.post('/addtocart',addtocart)
Route.get('/displaycart',displayCart)
Route.get('/usercart',usercart)
Route.get('/deletecartitem',postcartdeleteitem)

module.exports=Route