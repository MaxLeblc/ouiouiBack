const express = require('express')
const router = express.Router()

const Booking = require('../models/bookings')

router.put('/', (req, res) => {
    Booking.updateMany({ isPaid: false }, { isPaid: true }).then(({ modifiedCount }) => {
        res.json({result : modifiedCount > 0})
    })
})

router.get('/', (req,res) => {
    Booking.find({isPaid : true})
    .populate('trip')
    .then(bookings => {
        if(bookings.length > 0) {
            res.json({result:true, bookings})
        } else {
            res.json({result: false, error: 'No bookings found'})
        }
    })
})

router.delete('/', (req, res) => {
    Booking.deleteMany({isPaid: true})
    .populate('trip')
    .then(bookings => {
            res.json({result : true, bookings})
    })
})

module.exports = router
