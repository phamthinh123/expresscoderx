
var User=require("../models/user.model")
var Book=require("../models/book.model")
module.exports.index=async (request, response) => {
 //  var page=parseInt(request.query.page)||1;
 //  var rs={}
 //  var perPage=2;
 //  var start=(page-1)*perPage;
 //  var end=page*perPage
 //  if(end<db.get("books").value().length){
 //    rs.next={
 //      page:page+1
 //    }
 //  }
 //  if(start>0){
 //    rs.previous={
 //      page:page-1
 //    }
 //  }
 //  rs.current={
 //    page:page
 //  }
 //  rs.result=db.get("books").value().slice(start,end)
 // var user=db.get("users").find({id:request.signedCookies.userId}).value()
 var user=await User.findById(request.signedCookies.userId) 
 var books=await Book.find()
 
response.render("books/index",{
  user:user,
  // books:rs.result,
  // next:rs.next,
  // previous:rs.previous,
  books:books
  // current:rs.current
})
  

}
module.exports.delete=async (request, response) => {
  var id=request.params.id;
  // var book=db.get("books").find({id:id}).value()

  // db.get("books").remove(book).write()
 
  await Book.remove({_id:id})
  response.redirect("/books")
}
module.exports.update=(request, response) => {
  var id=request.params.id;
  
  response.render("books/update",{
    id:id
  })
  }
module.exports.postUpdate=async (request, response) => {
 
  var id=request.body.id;
  // db.get("books").find({id:id}).assign({title: request.body.title}).write()
  await Book.updateOne({_id:id},{$set:{title: request.body.title}})
  
  response.redirect("/books")
}

module.exports.postCreate=async (request, response) => {
  // request.body.id=shortid.generate();
  // db.get("books").push(request.body).write();
  
  await Book.create(request.body)
  response.redirect("/books");
}