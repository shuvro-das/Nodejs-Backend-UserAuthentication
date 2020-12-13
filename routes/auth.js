const router = require('express').Router();
const User = require('../model/User');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { registerValidation, LoginValidation} = require('../validation');
const bcrypt = require('bcryptjs');

dotenv.config();

//Register
router.post('/register', async (req,res) => {


    //lets Validate the data before we make a user
    const { error } = registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);


   //Checking if the user is already in the database
   const emailExist = await User.findOne({email: req.body.email});
   if(emailExist) return res.status(400).send("Email Already Exist");


   //HASH THE PASSWORDs
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

  
   //Create a new User
  const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
  });
  try{
    const savedUser = await user.save();
    res.send( {user: user._id});
  }catch(err) {
    res.status(400).send(err)
  }

  
});

//LOgin
router.post('/login',async (req,res) => {
    const { error } = LoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     //Checking if the email exist is  in the database
   const user = await User.findOne({email: req.body.email});
   if(!user) return res.status(400).send("Email is Not Found");
    
   // Password IS Correct
   const validpass = await bcrypt.compare(req.body.password, user.password);
    if(!validpass) return res.status(400).send("Invalid Password")




    //Create and assign a token
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);

    res.send('Logged IN!!!!!!!');

});





module.exports = router;