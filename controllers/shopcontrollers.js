const Product = require('../models/Product');
const Order= require('../models/Orders')
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
exports.postOrder = (req, res, next) => {
    req.user.populate('cart.items.productId').then(user => {
        // Map the populated products and extract required fields
        const products = user.cart.items.map(i => {
            return {
                quantity: i.quantity,
                product:{ ...i.productId._doc}
            };
        });

        console.log("Products in cart:", products);

        // Create and save the order
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });

        order.save()
            .then(() => {
                req.user.clearCart()

                res.status(201).json({ message: 'Order placed successfully!' });
            })
            .catch(err => {
                console.error('Error saving order:', err);
                res.status(500).json({ error: 'Failed to place order' });
            });
    }).catch(err => {
        console.error('Error populating user cart:', err);
        res.status(500).json({ error: 'Failed to populate cart items' });
    });
};

exports.orders=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','public/views/orders.html'))
}
exports.getOrders=(req,res,next)=>{
    Order.find({'user.userId':req.user._id})
    .then((r)=>{
        console.log("order are",r)
        res.json({data:r})
    })
}
