var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })
var router = express.Router()
var controller=require("../controllers/users.controller")
var validate=require("../validate/users.validate")
router.get('/', controller.index);
router.get('/:id/delete', controller.delete)


router.get("/:id/profile",controller.profile)


  

router.post("/:id/profile",upload.single('newAvatar'),controller.postProfile)
       

router.post("/create",upload.single('avatar'),validate.postCreate,controller.postCreate)
module.exports=router