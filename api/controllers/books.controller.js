
var User=require("../../models/user.model")
var Book=require("../../models/book.model")
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
//  var user=await User.findById(request.signedCookies.userId) 
//  var books=await Book.find()
 
// response.render("books/index",{
//   user:user,
//   // books:rs.result,
//   // next:rs.next,
//   // previous:rs.previous,
//   books:books
//   // current:rs.current
// })
await Book.find()
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
module.exports.delete=async (request, response) => {
  var id=request.params.id;
  // var book=db.get("books").find({id:id}).value()

  // db.get("books").remove(book).write()
 
  // await Book.remove({_id:id})
  // response.redirect("/books")
  await Book.remove({_id:id})
.exec()
.then(rs=>{
  response.status(200).json(rs)
})
.catch(err=>{
  console.log(err)
  response.status(500).json({
    error:err
  })
})
}
module.exports.update=async (request, response) => {
  var id=request.params.id;
  
  // response.render("books/update",{
  //   id:id
  // })
   await Book.findById(id)
  .exec()
  .then(doc =>{
    console.log(doc)
    response.status(200).json(doc)
  })
  .catch(err =>{
    console.log(err)
    response.status(500).json({
      error:err
    
  })
  })
  }
module.exports.postUpdate=async (request, response) => {
 
  var id=request.params.id;
  // // db.get("books").find({id:id}).assign({title: request.body.title}).write()
  // await Book.updateOne({_id:id},{$set:{title: request.body.title}})
  
  // response.redirect("/books")
   await Book.updateOne({_id:id},{$set:{ title: request.body.title}})
  .exec()
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

module.exports.postCreate=async (request, response) => {
  // request.body.id=shortid.generate();
  // db.get("books").push(request.body).write();
  
  // await Book.create(request.body)
  // response.redirect("/books");
   var book=new Book({

       title:request.body.title ,
        description:request.body.description 
 })
 
 
 //  response.redirect("/users");
 await book.save()
  
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