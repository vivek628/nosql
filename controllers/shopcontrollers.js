const Product = require('../models/Product');


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