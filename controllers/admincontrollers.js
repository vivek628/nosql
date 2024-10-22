const { ObjectId } = require('mongodb');
const Product=require('../models/Product')
const path=require('path')
exports.postProduct=(req,res,next)=>{
    console.log("req",req.body )
    const name= req.body.title;
    const price=req.body.price;
    const description=req.body.desc;
    const id=req.body.id
  //  console.log("userid",req.user_id)
   // console.log("idl",id)
    
    
    const prodct= new Product(name,price,description,null,id,req.user._id)
    prodct.save().then(()=>{
        console.log("product created ")
        res.json({ success: true, redirectUrl: '/' });
    }).catch((e)=>{
        console.log("err is ",e)
    })
}
exports.productpage= (req,res,next)=>{
    console.log("ji")
   res.sendFile(path.join(__dirname,'..','public/views/products.html'))
}
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
    console.log("jiii")
    const proId=req.params.ProductId
    Product.findById(proId).then((product)=>{
        console.log(product)
        res.json(product); 
        
    }).catch((e)=>{
        console.log("there us err ",e)
    })
}
exports.editProduct=async(req,res,next)=>{
    console.log(req.query.edit)
    console.log(req.params.ProductId)
    const id=req.params.ProductId
   await  Product.findById(id).then((product)=>{
        console.log("prod",product)
        res.json({ success: true, redirectUrl: `/homeedit/${id}` });

      
    }).catch((E)=>{

        console.log("err is ",E)
    })

}
exports.postEditproduct=(req,res,next)=>{
    try{
       
        const prodId=req.body.id
        console.log("id is",prodId)
        const updatedname= req.body.title;
        const updatedprice=req.body.price;
        const updateddescription=req.body.desc;
        const product= new Product(updatedname,updatedprice,updateddescription, null,prodId)
        product.save().then((result)=>{
            console.log("chnages in product is save")
            res.json({ success: true, redirectUrl: '/' });

        }).catch((e)=>{
            console.log("somthing went wrong",e)
            res.redirect('/')
        })

    }
    catch(e)
    {
        console.log("something went wrong in product edit",e)
    }
}
exports.deleteById=async (req,res,next)=>{
    try{
     const id=req.params.productId
     console.log("id to delete",id)
   await   Product.deleteById(id).then(()=>{
        console.log("product deleted")
        res.json({msg:"ok"})
     })
    }
    catch(e)
    {
        console.log("somthing went wrong in delete product",e)
    }
}
