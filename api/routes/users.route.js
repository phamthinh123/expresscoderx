var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })
var router = express.Router()
var controller=require("../controllers/users.controller")

router.get('/', controller.index);
router.get('/:id/delete', controller.delete)


router.get("/:id/profile",controller.profile)


  

router.post("/:id/profile",upload.single('newAvatar'),controller.postProfile)
       

router.post("/create",upload.single('avatar'),controller.postCreate)
module.exports=router