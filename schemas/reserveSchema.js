const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    nonreqString = { type: String, required: false },
    reqBoolean = { type: Boolean, required: true, default: false },
    reqNumber = { type: Number, required: true, default: 0 },
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');

const reserveSchema = new mongoose.Schema({
    reservename: reqString,
    status: { type: Number, required: true, default: 0 },
    powerProduction: [{ time: reqString, power: reqNumber }],
    energyLeft: {type: Number, required: true, default: 75},
    date: {
        type: String,
        default: dateStringWithTime
    }
})

module.exports = mongoose.model("Reserves", reserveSchema)