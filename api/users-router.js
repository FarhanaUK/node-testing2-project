const Users = require('./users-models')
const express = require('express')
const router = express.Router()


router.get ("/", async(req, res, next) => {
    try {
        const users = await Users.find()
        res.status(200).json(users);  
      } catch (err) {
        next(err)
      }
      
})

router.get("/:id", async(req, res, next) => {
  try {
    const user = await Users.findById(req.params.id)
    if(user){
      res.status(200).json(user);
    }  else {
      res.status(404).json({ message: 'User not found' }); // Handle case if user doesn't exist
    }
  } catch (err) {
    next(err)
  }
});

router.post("/", (req, res) => {
    res.status(200).json({message: "testing"})
});



module.exports = router;  // This exports the router to be used in other files
