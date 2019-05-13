const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auth',
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
);

const { User } = require('./models/user');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());//sranic heto routy veradarcnelua json
app.use(cookieParser());

app.post('/api/user', (req, res) => {
    console.log(req.body);

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch(err => console.log(err));
});

app.post('/api/user/login', async (req, res) => {
    try {
        const user = await User.findOne({'email':req.body.email});
        if(user){
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch) return res.status(400).json({
                    message:'Wrong password'
                });
                res.status(200).send(isMatch);
            });

            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).send('ok');
            })
            
        }else{
            throw new Error('Email not exists');
        }
    } catch (error) {
        res.json({message: error.message});
    }
});

app.get('/user/profile', auth, (req, res) => {
    res.status(200).send(req.token);
});

app.get('/test', (req, res) => {
    res.status(200).send('aaaa');
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
})


