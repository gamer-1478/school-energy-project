const router = require('express').Router();
const {ensureNotAuthenticated} = require('../utils/auth.js');

router.get('/admin', ensureNotAuthenticated, (req, res) => {
    res.render('pages/adminlogin.ejs')
});

router.get('/', (req,res)=>{
    res.render('pages/landing.ejs')
})

module.exports = router;