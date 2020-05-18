// var db=require("../db")
var Transaction=require("../models/transaction.model")
var User=require("../models/user.model")

module.exports.admin=async (request, response,next) => {
  
  // var user=db.get("users").find({id:request.signedCookies.userId}).value()
  var user=await User.findById(request.signedCookies.userId)

  if(!user.isAdmin){
    // var transaction=db.get("transactions").filter({userId:user.id}).value()

    var transaction=await Transaction.find({userId:user.id})
  
  }
  else{
    // var transaction=db.get("transactions").value()
var transaction=await Transaction.find()

  }
  response.locals.transaction=transaction
  
  next()
}