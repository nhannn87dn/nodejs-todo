const express = require("express");
const _ = require("lodash");
const router = express.Router();
const {User} = require('../models/users.model');
const bcrypt = require('bcrypt');
const {validateUser} =  require('../validations/validations');

router.post('/register', async (req,res)=> {
    
    /* validate */
    const { error } = validateUser(req.body, true);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    
    /* check unique */
    const user_email = await User.findOne({
        email: req.body.email
    })

    if(user_email){
        return res.status(400).send({ error: 400, message: "Email is exists !" });
    }

    try {
         /* storage */
        const user = new User(req.body);
        await user.save();

    } catch (error) {
        return res.status(500).send({ error: 500, message: error.message });
    }
    

   res.send({ error: 0, message: "Successfully",data:  req.body.email});
});

router.post('/login', async(req, res)=>{
    
    /* validate */
    const { error } = validateUser(req.body, true);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    /* check user exists */
    let user_email = await User.findOne({
        email: req.body.email
    });
    if(!user_email) return result.status(400).send({ error: 400, message: "Invalid email or password"});



    const invalidPasword = bcrypt.compare(
        req.body.password,
        user.password
    );
    if(!invalidPasword) return res.status(400).send({ error: 400, message: "Invalid email or password" });
    
    const token = user.generateAuthToken();
    res.send(token);
});


module.exports = router;