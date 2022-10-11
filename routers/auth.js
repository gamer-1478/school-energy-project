const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../schemas/userSchema.js');
const { ensureAuthenticated, ensureNotAuthenticated } = require('../utils/auth.js');

router.post('/login', ensureNotAuthenticated, async(req, res, next) => {
    return await loginUser(req, res, next);
})

router.get('/register', (req, res) => {
    res.render('pages/reg', { user: req.user });
})

router.post('/register', async (req, res) => {
    var {email, password, name} = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });
    if (user) {
        return res.redirect('/dashboard');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email: email,
        password: hashedPassword,
        name: name
    });
    await newUser.save().then((doc) => {
        console.log("doc", doc);
        res.redirect('/');
    }).catch(err => {
        console.log("err", err);
    });
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

// Login User Function
async function loginUser(req, res, next) {
    await passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send([{ msg: info.message }]);
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send([{ msg: "Successfully Authenticated", sucess: true }]);
            });
        }
    })(req, res, next);
}

module.exports = router;


