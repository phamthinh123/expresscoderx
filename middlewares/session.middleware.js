var Session=require("../models/session.model")
const shortid = require('shortid');
module.exports=async (request, response,next) => {
 if(!request.signedCookies.sessionId){
   var sessionId=shortid.generate();
    response.cookie("sessionId",sessionId,{
    signed:true
  })
 }
  
  Session.create({sessionId:sessionId})
  
  
 

  next();
}