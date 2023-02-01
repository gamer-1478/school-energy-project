const router = require('express').Router();
const {ensureAuthenticated} = require('../utils/auth.js');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    //[TODO: Redirect to assigned zone dashboard]
    res.redirect('/zone/63da9dd55eefca1e8bba4c7a')
});

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('pages/profile', {user: req.user});
});

module.exports = router;