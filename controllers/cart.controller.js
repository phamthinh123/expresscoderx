var db=require("../db")
const shortid = require('shortid');
var User=require("../models/user.model")
var Book=require("../models/book.model")
var Cart=require("../models/cart.model")
var Session=require("../models/session.model")
module.exports.addToCart=async (request, response) => {
// var sessionId=request.signedCookies.sessionId;
// var bookId=request.params.bookId;
// if(!sessionId){
//   response.redirect("/books")
//   return
// }
// // var count=db.get("sessions").find({id:sessionId})
// // .get("cart."+bookId,0)
// // .value();
// //   db.get("sessions").find({id:sessionId})
// //   .set("cart."+bookId,count+1)
// //   .write()
// var count=await Session.findOne({sessionId:sessionId})
  var bookId=request.params.bookId;
  var cart=new Cart(request.session.cart ? request.session.cart:{})

  var book=await Book.findById(bookId)
  cart.add(book,book.id)
  request.session.cart=cart;
  
  response.redirect("/books")
}
module.exports.index=async (request, response) => {
  var cart=request.session.cart;
  var userId=request.signedCookies.userId
  // var user=db.get("users").find({id:userId}).value()
  var user=await User.findById(userId)
  
 
  
  response.render("cart/index",{
    user:user,
    cart:cart
  })
}