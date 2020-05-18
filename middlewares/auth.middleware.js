// var db=require("../db")
var User=require("../models/user.model")

module.exports.requireAuth=async (request, response,next) => {
  if(!request.signedCookies.userId){
    response.redirect("/auth/login")
    return
  }
  // var user=db.get("users").find({id:request.signedCookies.userId}).value()
  var user=await User.findById(request.signedCookies.userId)
  if(!user){
    response.redirect("/auth/login")
    return
  }
  
  response.locals.user=user
  next()
}