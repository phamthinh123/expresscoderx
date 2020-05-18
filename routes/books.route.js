var express = require('express')
var router = express.Router()
var controller=require("../controllers/books.controller")
router.get('/', controller.index)
  
  

router.get('/:id/delete', controller.delete)


router.get("/:id/update",controller.update)
  

router.post("/:id/update",controller.postUpdate)
       

router.post("/create",controller.postCreate)

module.exports=router