const router = require('express').Router();
const User = require('../schemas/userSchema.js');
const { ensureAuthenticated, ensureNotAuthenticated } = require('../utils/auth.js');

//gov employs will be registeredby one admin only through some other pannel, this is for testing only. commented out
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

module.exports = router;