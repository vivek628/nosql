const mongodb=require('mongodb')
const getdb=require('../utils/dbconnection').getdb
const ObjectId=mongodb.ObjectId
class User{
    constructor(username,email,cart,id)
    {
        this.name=username;
        this.email=email;
        this.cart=cart;
        this._id=id

    }
    addToCart(product)
    {
      const cartProductIndex=this.cart.item.findIndex(cp=>{

        return cp.productId.toString()===product._id.toString()
      })
     let newQuantity=1
     let updateCartItems=[...this.cart.item]
     if(cartProductIndex>=0)
     {
      newQuantity=this.cart.item[cartProductIndex].quantity+1
      updateCartItems[cartProductIndex].quantity=newQuantity

     }
     else{
      updateCartItems.push({

        productId:new ObjectId(product._id),
        quantity:newQuantity

      })
     }
    
      const updatecart={item:updateCartItems}
      const db=getdb()
      db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:updatecart}})
    }

    getCart() {
      const db = getdb();
      const productids = this.cart.item.map(i => {
          return i.productId; 
      });
  
      console.log("productids are", productids);
      
      
      const objectIds = productids.map(id => new ObjectId(id));
  
      return db.collection('products').find({ _id: { $in: objectIds } }).toArray().then(products => {
          console.log("products are", products);
          return products.map(p => {
              return {
                  ...p,
                  quantity: this.cart.item.find(i => i.productId.toString() === p._id.toString()).quantity
              };
          });
      });
  }
    save()
    {
        const db=getdb()
        db.collection('user').insertOne(this).then(()=>{


        }).catch((e)=>{
             console.log("something went wrong in saving data")
        })


    }
    static findById(id)
    {
      const db=getdb()
      return db.collection('users').findOne({_id:new ObjectId(id)}).then((r)=>{
         console.log("everything is fine")
         console.log(r)
         return r
      }).catch((E)=>{
        console.log("somtjing went wrong in user ",E)
      })
    }
    deleteItemFromCart(productId) {
      console.log("ko");
      console.log("Cart items:", this.cart.item); 
  
      const updatedCartItem = this.cart.item.filter(i => {
       
          return i.productId && i.productId.toString() !== productId.toString();
      });
  
      const db = getdb();
      db.collection('users').updateOne(
          { _id: new ObjectId(this._id) },
          { $set: { cart: { item: updatedCartItem } } }
      )
      .then(result => {
          console.log("Cart updated successfully:", result);
      })
      .catch(err => {
          console.error("Error updating cart:", err);
      });
  }
  
  }

module.exports=User