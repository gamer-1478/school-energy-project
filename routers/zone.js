const router = require('express').Router();
const User = require('../schemas/userSchema.js');
const Zone = require('../schemas/zoneSchema.js');
const Reserve = require('../schemas/reserveSchema.js');
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

router.get('/all', ensureAuthenticated, async (req, res) => {
    const zones = await Zone.find({});
    res.render('pages/publiccity.ejs', { user: req.user, zones: zones });
});

router.get('/:id', ensureAuthenticated, async (req, res) => {
    const zone = await Zone.findById(req.params.id);
    const labels = zone.powerConspumption.map((item) => item.time);
    var currentTimeToNearestTenMinutes = new Date("IST");
    currentTimeToNearestTenMinutes.setMinutes(Math.round(currentTimeToNearestTenMinutes.getMinutes() / 10) * 10);
    currentTimeToNearestTenMinutes.setSeconds(0);

    //get time only
    currentTimeToNearestTenMinutes = currentTimeToNearestTenMinutes.toTimeString().split(' ')[0];

    const dataConsumed = zone.powerConspumption.map((item) => {
        if (item.time > currentTimeToNearestTenMinutes) {
            return NaN;
        } else {
            return item.power;
        }
    });

    const dataPredicted = zone.powerConspumption.map((item) => {
        if (item.time < currentTimeToNearestTenMinutes) {
            return NaN;
        } else {
            return item.power;
        }
    });

    var reserves = zone.reserves.map(async (item) => {
        const reserve = await Reserve.findById(item);
        return reserve;
    });
    reserves = await Promise.all(reserves);
    res.render('pages/zoneview.ejs', { user: req.user, zone: zone, labels, dataConsumed, dataPredicted, reserves: await reserves });
})

module.exports = router;