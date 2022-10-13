const router = require('express').Router();
const Zone = require('../schemas/zoneSchema.js');
const Issue = require('../schemas/reportSchema.js');
const User = require('../schemas/userSchema.js');

router.get('/all', async (req, res) => {
    const zones = await Zone.find({});
    res.render('pages/allzones.ejs', { zones: zones });
})

router.get('/paybill', (req, res) => {
    res.render('pages/profile.ejs');
})

router.get('/issue', async(req, res) => {
    var zones = await Zone.find({});
    res.render('pages/issue.ejs', { zones});
})

router.post('/issue', async(req, res) => {
    var { fullname, phone, adress, zones} = req.body;
    var issue = new Issue({
        fullname,
        phone,
        adress,
        zones
    })
    await issue.save();
    console.log(issue);
    res.send({message: 'Issue created'});
})

module.exports = router;