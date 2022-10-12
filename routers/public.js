const router = require('express').Router();
const Zone = require('../schemas/zoneSchema.js');

router.get('/all', async (req, res) => {
    const zones = await Zone.find({});
    res.render('pages/allzones.ejs', { zones: zones });
})

router.get('/paybill', (req, res) => {
    res.render('pages/profile.ejs');
})

router.get('/issue', (req, res) => {
    res.render('pages/issue.ejs');
})

module.exports = router;