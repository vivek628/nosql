const Product = require('../models/Product');
const path= require('path')


exports.fetchAll = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            res.json(products); 
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred while fetching products.' });
        });
};
exports.getProduct=(req,res,next)=>{
    const proId=req.params.ProductId
    Product.findById(proId).then((product)=>{
        console.log(product)
    }).catch((e)=>{
        console.log("there us err ",e)
    })
}
exports.postOrder=(req,res,next)=>{
    try{
        console.log("aaya")
        req.user.addOrder().then(result=>{
            console.log(result)
            res.json({msg:"ok"})
        })
    }
    catch(e)
    {
        console.log("err in post ",e)
    }
   
}
exports.orders=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','public/views/orders.html'))
}
exports.getOrders=(req,res,next)=>{
    req.user.getOrders().then((r)=>{
        console.log("order are",r)
        res.json({data:r})
    })
}
