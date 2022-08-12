const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    password:  {
        type: String,
        required: true,
        trim:true,
    }
    
},
{timestamps: true}
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this.id, email: this.email},'catFly100miles');
    return token;
}

userSchema.pre('save', async function (next){
    const rounds = 10; // what you want number for round password
    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;
    next();
});

const User = new mongoose.model('User',userSchema);
exports.User = User;