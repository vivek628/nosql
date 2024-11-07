const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ProductSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Product',ProductSchema)

/*const getdb = require('../utils/dbconnection').getdb;
const mongodb=require('mongodb')

class Product {
    constructor(title, price, desc, imgUrl,prodId,userId) {
        
        console.log("id in constructor is ",prodId)
        this.title = title;
        this.price = price;
        this.description = desc;
        this.imgUrl = imgUrl;
        this._id = prodId ? new mongodb.ObjectId(prodId) : null;
        this.userId=userId
        console.log("userid",userId)
       
    }
    

    save() {
        const db = getdb();
        let dbop
    
        console.log("title in model",this.title)
        if(this._id)
        {
        return dbop=db.collection('products').updateOne({_id:this._id},{$set:this})
        }
        else{
            dbop=db
            return dbop.collection('products').insertOne({
                title: this.title,
                price: this.price,
                description: this.description,
                imgUrl: this.imgUrl,
                userId:this.userId
            })
            .then(result => {
                console.log("Product saved:");
            })
            .catch(e => {
                console.log("Error saving product:", e);
            }); 
        } 
    
    }
    static fetchAll() {
        const db = getdb();
        return db.collection('products').find().toArray() 
            .then((products) => {
               // console.log("products is ", products);
                return products; 
            })
            .catch((error) => {
                console.error("Error fetching products:", error); 
                throw error; 
            });
    }
    static findById(productId){
        const db=getdb()
        
        return db.collection('products').find({_id: new mongodb.ObjectId(productId)}).next().then((product)=>{
            console.log("product is ",product)
            return product
        }).catch((e)=>{
            console.log("err in fetching single product",e)
        })
    }
    static deleteById(id)
    {
        const db=getdb()
        return db.collection('products').deleteOne({_id:new mongodb.ObjectId(id)}).then(()=>{
            console.log("product deleted")

        }).catch((e)=>{
            console.log("err in deleting product ",e)
        })
    }
    
}

module.exports = Product; */
