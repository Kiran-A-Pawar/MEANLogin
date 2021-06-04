const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const config2 = require('../config2/key');
const Emp = require('../models/emp');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({ success: true, msg: 'User registered' });
    }
  });
});

router.post("/addemp",async(req,res)=>{
  try{

    var newemp =new Emp();
    newemp.name= req.body.name;
    newemp.paygrade = req.body.paygrade;
    newemp.gender = req.body.gender;
    newemp.pay = req.body.pay;

   console.log(req.body)
 const insertemp = await newemp.save();
 res.send(insertemp)

  }catch(e){
    res.status(400).send(e)
  }

})


router.get("/getemp",async(req,res)=>{
  try{

     const getemployee = await Emp.find({});
 res.send(getemployee)

  }catch(e){
    res.status(201).send(e)
  }

})


// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, config2.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: `Kiran ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email,
    }
  });
});

module.exports = router;
