const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../schemas/userSchema.js');
const { ensureAuthenticated, ensureNotAuthenticated } = require('../utils/auth.js');

//logout user endpoint
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

//login user endpoint
router.post('/login', ensureNotAuthenticated, async (req, res, next) => {
    return await loginUser(req, res, next);
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

//[TODO: add verify otp for real]
router.post('/verifyotp', ensureAuthenticated, async(req, res) => {
    res.send([{ msg: "Successfully Authenticated", sucess: true }]);
})

if (process.env.REGISTERATION_FLAG == "true") {
    //register user endpoint
    router.use('/', require('./register.js'));
}

module.exports = router;


