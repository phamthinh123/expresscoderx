var User=require("../models/user.model")


module.exports.postCreate=async(request, response,next) => {
  var users=User.find();
  var errors = [];

  if (!request.body.name) {
    errors.push('Name is required.');
  }

  if (!request.body.phone) {
    errors.push('Phone is required');
  }
  if (!request.body.email) {
    errors.push('Email is required');
  }
if(request.body.name.length>30){
    errors.push("name.length < 30")
  }
  if (errors.length) {
    response.render("users/index",{
      users: users,
      errors: errors,
      values: request.body
    });
    return;
  }
  next()
}