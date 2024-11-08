const path= require('path')
const Product = require('../models/Product');

exports.home=(req,res,next)=>{
   
    res.sendFile(path.join(__dirname,'..','public/views/home.html'))
}
exports.products=async (req,res,next)=>{
    console.log("hi ",req.user._id)
    const id=req.user._id
    const idString = id.toString(); 
    console.log(idString);
    res.sendFile(path.join(__dirname,'..','public/views/user.html'))
}


exports.addtocart=async (req,res,next)=>{
     try{
        console.log("body",req.body.productId)
        const proId= req.body.productId
        console.log("productid",proId)
        await Product.findById(proId).then(product=>{
            console.log(product)
            return req.user.addToCart(product)
        }).then((result)=>{
           res.json({msg:"ok"})
        })
     }
     catch(e)
     {
        console.log("somthing went wrong",e)
     }
}
/*exports.usercart = (req, res, next) => {
    req.user.getCart().then(products => {
        console.log("orp", products);
        res.json({data:products  
        })
      
    }).catch(err => {
        console.error(err);
        res.status(500).send("Error fetching cart.");
    });
}*/
exports.usercart=(req,res,next)=>{
    req.user.populate('cart.items.productId').then(user=>{
        const products=user.cart.items
        console.log(user.cart.itmes)
        console.log("pro",products)
        res.json({data:products})

    })
}
exports.displayCart=(req,res,next)=>{
    console.log("hain")
    res.sendFile(path.join(__dirname, '..', 'public/views/cart.html'));
}
exports.postcartdeleteitem=(req,res,next)=>{
    const id=req.query.id;
    console.log("id",id)
    req.user.deleteItemFromCart(id).then(()=>{
        res.redirect('/displaycart')
    })
}

