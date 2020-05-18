var mongoose=require("mongoose")
var userSchema=new mongoose.Schema({
	
  name:String,
  phone:String,
  email:String,
  password:String,
  avatar:String,
  avatarUrl:String,
  wrongLoginCount:Number,
  isAdmin:Boolean
  
})
var User=mongoose.model("user",userSchema,"users")
module.exports=User