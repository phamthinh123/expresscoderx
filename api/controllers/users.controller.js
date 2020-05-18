var User=require("../../models/user.model")
const bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'coderstokyo',
    api_key: '647892143847692',
    api_secret: 'wckq9c5mds7-AMtxGY-HIqoWgn0'
});
const saltRounds = 10;

module.exports.index=async (request, response) => {

//  var users= await User.find();

// response.render("users/index",{
//   users:users
// })
  
  await User.find()
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
  
  // await User.remove({_id:id});
await User.remove({_id:id})
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
module.exports.postCreate= async (request, response) => {
  

 //  request.body.wrongLoginCount=0;
 //  request.body.isAdmin=false;
 //  request.body.password= await bcrypt.hash('123123', saltRounds)
 //  if(!request.file){
 //  request.body.avatar="/default.png"
 //  cloudinary.uploader.upload("public"+request.body.avatar,async function(error, result) {
    
 //    request.body.avatarUrl=result.secure_url;
 // // await User.create(request.body)
  
 var user=new User({

        name:request.body.name ,
        phone:request.body.phone ,
        email:request.body.email ,
        password:await bcrypt.hash(request.body.password, saltRounds) ,
        avatar: request.body.avatar,
        isAdmin: request.body.isAdmin,
        wrongLoginCount: request.body.wrongLoginCount,
        avatarUrl: request.body.avatarUrl
 })
 
 
 //  response.redirect("/users");
 await user.save()
  
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
//   });  
//   }
//   else{
//     request.body.avatar ="/"+request.file.path.split('\\').slice(1).join('/');
//     cloudinary.uploader.upload("public"+request.body.avatar,async function(error, result) { 
    
//     request.body.avatarUrl=result.secure_url;
//   //   await User.create(request.body)
  
 
 
 
//   // response.redirect("/users");
//   await User.creare(request.body)
//   .exec()
//   .then(rs =>{
//     console.log(rs)
//     response.status(200).json(rs)
//   })
//   .catch(err =>{
//     console.log(err)
//     response.status(500).json({
//       error:err
    
//   });  
//   })
  
  
  
// })
//   }
 }

module.exports.profile=async (request, response) => {
  var id=request.params.id;

 // var user=await User.findById(id) 
 
 

 //  response.render("users/profile",{
 //    id:id,
 //    user:user
 //  })
 await User.findById(id)
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
module.exports.postProfile=async (request, response) => {
 
  // var id=request.body.id;
var id=request.params.id;


  
  // var user=await User.findById(id) 
  // cloudinary.uploader.upload("public"+user.avatar,async function(error, result) {

// await User.updateOne({_id:id},{$set:{name: request.body.name,
//                                          phone:request.body.phone,
//                                   avatar:"/"+request.file.path.split('\\').slice(1).join('/'),
//                                   avatarUrl:result.secure_url}})
//  response.redirect("/users")
 // await User.updateOne({_id:id},{$set:{name: request.body.name,
 //                                          phone:request.body.phone,
 //                                   avatar:"/"+request.file.path.split('\\').slice(1).join('/'),
 //                                 avatarUrl:result.secure_url}})
  await User.updateOne({_id:id},{$set:{ name:request.body.name ,
        phone:request.body.phone ,
        email:request.body.email ,
        password:request.body.password ,
        avatar: request.body.avatar,
        isAdmin: request.body.isAdmin,
        wrongLoginCount: request.body.wrongLoginCount,
        avatarUrl: request.body.avatarUrl}})
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
  };
  
  
 
  




