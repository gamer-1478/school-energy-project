const router = require('express').Router();
const {ensureNotAuthenticated} = require('../utils/auth.js');

router.get('/', ensureNotAuthenticated, (req, res) => {
    req.user = { email: "newemail@gov.in" }
    res.render('index')
});

module.exports = router;