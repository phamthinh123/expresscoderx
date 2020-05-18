

var User=require("../../models/user.model")
var Book=require("../../models/book.model")
var Transaction=require("../../models/transaction.model")

var  bcrypt = require('bcrypt');
var md5 = require('md5');

var sgMail = require('@sendgrid/mail');

module.exports.login=(request, response) => {
// response.render("auth/login")
response.status(201).json({
          message: "Login"
        });
}
module.exports.postLogin=async (request, response) => {
var email=request.body.email;
var password=request.body.password;

// var user=await User.findOne({email:email})

// if(!user){
//   response.render("auth/login",{
//   errors:["User is not exist"],
//   values:request.body
// })
//   return
// }
  
//     const match = await bcrypt.compare(password, user.password)
//     if(!match){
    
   
//     await User.updateOne({email:email},{$set:{wrongLoginCount:++user.wrongLoginCount}})
//     console.log(user,user.wrongLoginCount)
//       if(user.wrongLoginCount<=3){
//       response.render("auth/login",{
//       errors:["Wrong password"],
//       values:request.body
//       })
//       return
//       }
//       else{
        
//         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
//         const msg = {
//         to: user.email,
//         from: 'thinoi987654321@gmail.com',
//         subject: 'LOGIN SAI QUA 3 LAN',
//         text: 'login sai qua 3 lan roi !!!'
//       };
//     sgMail.send(msg)
   
//     response.render("auth/login",{
//     errors:["Wrong too much"],
//     values:request.body
//   })
//         return
//       }
//     }

// await User.updateOne({email:email},{$set:{wrongLoginCount:0}})

//   response.cookie("userId",user.id,{
//     signed:true
//   })
//   response.redirect("/users")
User.findOne({ email:email })
    .exec()
    .then(async function(user){
      if (!user) {
        return response.status(401).json({
          message: "User is not exist"
        });
      }
      const match = await bcrypt.compare(password, user.password)
      if(!match){
     
          return response.status(401).json({
            message: "Wrong password"
          });
        }
       
        response.status(201).json({
          message: "Auth successful",
          user:user
        });
      
      })

  
    .catch(err => {
   
      response.status(500).json({
        error: err
      });
    });

 
}