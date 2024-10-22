const express=require('express')
const app= express()
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
const path=require('path')
app.use(express.static('public'))
const userRoute=require('./routes/userRoutes')
const adminRoute=require('./routes/adminroutes')
const shopRoute=require('./routes/shoproutes')
const User=require('./models/User')
app.use(express.static('public'))
app.use((req,res,next)=>{
    User.findById('671497c317c98855342a7859').then((user)=>{
        req.user=new User(user.name,user.email,user.cart,user._id)
        console.log("user",user)
        console.log(user._id)
        next()
    }).catch((e)=>{
        console.log("somthing went wrong",e)
    })
})
app.use(userRoute)
app.use(adminRoute)
app.use(shopRoute)
const mongoconnect=require('./utils/dbconnection').mongoconnect
mongoconnect(()=>{
    app.listen(5000,()=>{
        console.log("servere is running on ")
    })
}
   
  
    
)