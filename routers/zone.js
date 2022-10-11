const router = require('express').Router();
const User = require('../schemas/userSchema.js');
const Zone = require('../schemas/zoneSchema.js');
const { ensureAuthenticated, ensureNotAuthenticated } = require('../utils/auth.js');
const data = require('../utils/chart.json');

router.get('/add', ensureAuthenticated, async (req, res) => {
    res.render('pages/zoneadd.ejs', { user: req.user });
})

router.post('/add', ensureAuthenticated, async (req, res) => {
    const { name, location, reserveid } = req.body;
    console.log(name);
    const newZone = new Zone({
        zonename: name,
        status: 0,
        zonelocation: location,
        reserves: [reserveid],
        powerConspumption: data,
    })
    newZone.save().then(() => {
        res.redirect('/zone');
    }).catch((err) => {
        console.log(err);
    })
});

module.exports = router;