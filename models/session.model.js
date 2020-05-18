var mongoose=require("mongoose")
var sessionSchema=new mongoose.Schema({
sessionId:String,
   cart : [
      {
        productId: String,
        quantity: Number
      }
    ],
  
  
})
var Session=mongoose.model("session",sessionSchema,"sessions")
module.exports=Session