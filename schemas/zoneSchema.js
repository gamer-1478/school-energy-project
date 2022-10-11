const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    nonreqString = { type: String, required: false },
    reqBoolean = { type: Boolean, required: true, default: false },
    reqNumber = {type: Number, required: true, default: 0},
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');

const zoneSchema = new mongoose.Schema({
    zonename: reqString,
    zonelocation: reqString,
    status: {type: Number, required: true, default: 0},
    reports: [nonreqString],
    powerConspumption: [{time: reqString, power: reqNumber}],
    reserves: [reqString],
    date: {
        type: String,
        default: dateStringWithTime
    }
})

module.exports = mongoose.model("Zone", zoneSchema)