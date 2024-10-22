const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
let _db

const mongoconnect=(callback)=>
{
    MongoClient.connect('mongodb+srv://siloriv2:WxNzA0risA95pWhJ@cluster0.l9jqp.mongodb.net/Sharpnere?retryWrites=true&w=majority&appName=Cluster0').then((client)=>{
        console.log("connection done")
        _db=client.db('Product')
         callback(client)
    }).catch(e=>{
        console.log("err  in connection",e)
    })
}
const getdb=()=>{
    if(_db)
    {
        return _db
    }
    throw "no database"
}
exports.mongoconnect=mongoconnect
exports.getdb=getdb
