
const shortid = require('shortid');
var User=require("../../models/user.model")
var Book=require("../../models/book.model")
var Cart=require("../../models/cart.model")

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
 
  // var book=await Book.findById(bookId)
  await Book.findById(bookId)
  .exec()
  .then(book => {
      if (!book) {
        return response.status(404).json({
          message: "Book not found"
        });
      }
         cart.add(book,book.id)

   request.session.cart=cart;

       response.status(201).json(
        book
       );
      
    })
.catch(err => {
   
      response.status(500).json({
        error: err
      });
    });
  // cart.add(book,book.id)
  // request.session.cart=cart;
  
  // response.redirect("/books")
}
module.exports.index=async (request, response) => {
 
  // var userId=request.signedCookies.userId
  // // var user=db.get("users").find({id:userId}).value()
  // var user=await User.findById(userId)
 
  
  // response.render("cart/index",{
  //   user:user,
  //   cart:cart
  // })
  response.status(200).json(request.session.cart)
}