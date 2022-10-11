const router = require('express').Router();
const User = require('../schemas/userSchema.js');
const Reserves = require('../schemas/reserveSchema.js');
const { ensureAuthenticated, ensureNotAuthenticated } = require('../utils/auth.js');
const data = require('../utils/chart.json');

router.get('/add', ensureAuthenticated, async (req, res) => {
    res.render('pages/reserveadd.ejs', { user: req.user });
})

router.post('/add', ensureAuthenticated, async (req, res) => {
    const { name } = req.body;
    console.log(name);
    const newReserve = new Reserves({
        reservename: name,
        status: 0,
        powerProduction: data,
    });
    newReserve.save().then(() => {
        console.log("Reserve added");
    }).catch((err) => {
        console.log(err);
    });
    res.redirect('/reserve/add');
})

module.exports = router;