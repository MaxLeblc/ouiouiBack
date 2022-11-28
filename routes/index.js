const express = require('express')
const router = express.Router()

const moment = require('moment')
const Trip = require('../models/trips')

router.get('/search/:departure/:arrival/:date', (req, res) => {
  const { departure, arrival, date } = req.params

  Trip.find({
    departure: new RegExp(departure, 'i'),
    arrival: new RegExp(arrival, 'i'),
    date: { $gte: moment(date).startOf('month'), $lte: moment(date).endOf('month') },
  }).then(trips => {
    if (trips.length > 0) {
      res.json({ result: true, trips })
    } else {
      res.json({ result: false, error: 'No trip found' })
    }
  })
})

module.exports = router