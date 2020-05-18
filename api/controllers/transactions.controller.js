// var db=require("../db")
// const shortid = require('shortid');

var User=require("../../models/user.model")
var Book=require("../../models/book.model")
var Transaction=require("../../models/transaction.model")

module.exports.index=async (request, response) => {
  // var page=parseInt(request.query.page)||1;
  // var rs={}
  // var perPage=2;
  // var start=(page-1)*perPage;
  // var end=page*perPage
  // if(end<response.locals.transaction.length){
  //   rs.next={
  //     page:page+1
  //   }
  // }
  // if(start>0){
  //   rs.previous={
  //     page:page-1
  //   }
  // }
  // rs.current={
  //   page:page
  // }
  // rs.result=response.locals.transaction.slice(start,end)
 // var transactions=response.locals.transaction
// response.render("transactions/index",{
//  // transactions:rs.result,
//  //  next:rs.next,
//  //  previous:rs.previous,
//  //  current:rs.current
//   transactions:transactions
// })
await Transaction.find()
  .exec()
  .then(docs =>{
    console.log(docs)
    response.status(200).json(docs)
  })
  .catch(err =>{
    console.log(err)
    response.status(500).json({
      error:err
    })
 })
}
module.exports.create=async (request, response) => {
  // var books=await Book.find()
  // var users=await User.find()
  // response.render("transactions/create",{
  //   // books:db.get("books").value(),
  //   // users:db.get("users").value()
    
  //   books:books,
  //   users:users
  // })
await Transaction.find()
  .exec()
  .then(docs =>{
    console.log(docs)
    response.status(200).json(docs)
  })
  .catch(err =>{
    console.log(err)
    response.status(500).json({
      error:err
    })
 })
}
module.exports.postCreate=async (request, response) => {
  // request.body.isComplete=false;
  // // request.body.id=shortid.generate();
  // // db.get("transactions").push(request.body).write();
  
  // await Transaction.create(request.body)
  // response.redirect("/transactions");
    var transaction=new Transaction({

       userId:request.body.userId ,
        bookId:request.body.bookId,
        isComplete:request.body.isComplete 
 })
 
 
 //  response.redirect("/users");
 await transaction.save()
  
  .then(rs =>{
    console.log(rs)
    response.status(200).json(rs)
  })
  .catch(err =>{
    console.log(err)
    response.status(500).json({
      error:err
    })
 })
}
module.exports.complete=async (request, response) => {
 var id=request.params.id;
 // var transaction=await Transaction.findById(id);
 //  if(!transaction){
 //    // response.rediect("/transactions")
 //    // return

 //  }
  
 //  // db.get("transactions").find({id:id}).assign({isComplete:true}).write()
 //  await Transaction.updateOne({_id:id},{$set:{isComplete:true}})
 //  response.redirect("/transactions")
 await Transaction.findById(id)
 .then(transaction=>{
  if(!transaction){
   return response.status(404).json({
          message: "Transaction not found"
        });
  }
  return Transaction.updateOne({_id:id},{$set:{ isComplete:true}})
  .exec()
 })
  
  .then(rs =>{
    console.log(rs)
    response.status(200).json(rs)
  })
  .catch(err =>{
    console.log(err)
    response.status(500).json({
      error:err
    })
 })
}
module.exports.postRent=async (request, response) => {
  // var session=db.get("sessions").find({id:request.signedCookies.sessionId}).value()
 
  
  request.body.isComplete=false;
  
  request.body.userId=request.signedCookies.userId
  console.log(Object.keys(request.session.cart.items),request.session.cart.items)
  for(var a of Object.keys(request.session.cart.items)){
    request.body.bookId=a;
    await Transaction.create(request.body)
  }
 
  // db.get("transactions").push(request.body).write();
 
  // db.get("sessions")
  // .find({ id:request.signedCookies.sessionId})
  // .assign({ cart:{} })
  // .write()
// await Session.updateOne({_id:request.signedCookies.sessionId},{$set:{cart:{}}})  
request.session.destroy()
    response.redirect("/cart")
  
}