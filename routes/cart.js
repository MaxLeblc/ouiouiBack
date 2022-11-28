const express = require('express')
const router = express.Router()

const Trip = require('../models/trips')
const Booking = require('../models/bookings')

router.post('/', (req, res) => {

  Trip.findById(req.body.tripId).then(trip => {
    if (trip) {
      const newBooking = new Booking({
        trip: trip._id,
        isPaid: false,
      })

      newBooking.save().then(() => {
        res.json({ result: true })
      })

    } else {
      res.json({ result: false, error: 'Trip not found', })
    }
  })
})

router.get('/', (req, res) => {

  Booking.find({ isPaid: false })
    .populate('trip')
    .then(bookings => {
      if (bookings.length > 0) {
        res.json({ result: true, bookings })
      } else {
        res.json({ result: false, error: ' No Bookings Found' })
      }
    })
})

router.delete('/:tripId', (req, res) => {
  Booking.deleteOne({ trip: req.params.tripId }).then(({ deletedCount }) => {
    Booking.find({ isPaid: false })
      .populate('trip')
      .then(bookings => {
        res.json({ result: deletedCount > 0, bookings })
      })
  })
})

module.exports = router