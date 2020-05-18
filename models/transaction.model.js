var mongoose=require("mongoose")
var transactionSchema=new mongoose.Schema({

  userId:String,
      bookId: String,
      isComplete: Boolean
  
})
var Transaction=mongoose.model("transaction",transactionSchema,"transactions")
module.exports=Transaction