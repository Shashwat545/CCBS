express = require('express');
const bookingModel = require('../models/bookingModel') ;

const getAllBookings = async (req,res) => {
    try{
            const bookings = await bookingModel.find();
            res.status(200).json(bookings);
    }catch(err){
            res.status(500).send(err)
    }
}

const getBooking = async (req,res) => {
    try{
            const bookings = await bookingModel.findById(req.params.id);      //should I keep this params or body as anyone could see other booking also with this method.
            res.status(200).json(bookings);                                         
    }catch(err){
            res.status(500).send("Error in booking" + err)
    }
}

const createBooking = async(req,res) => {
    const newBooking = new bookingModel({
            start_time : req.body.startTime,
            end_time : req.body.endTime,
            reason :  req.body.reason
    })
    try{
            const bookRequest = await newBooking.save()
            res.status(200).json(bookRequest)
    }catch(err){
            res.status(500).send(err)
    }
}

const deleteBooking = async(req,res) => {
        try{
                await bookingModel.findByIdAndRemove(req.params.id)
                res.status(200).send("Booking deleted successfully")
        }catch(err){
                res.status(500).send(err);
        }
}

const updateBooking = async(req,res) => {
        try{
                const booking = findById(req.params.id);
                const updates = req.body;
                const result = await bookingModel.findByIdAndUpdate(req.params.id, updates, {new: true});
                res.status(200).send(result);
        }catch(err){
                res.status(500).send(err);
        }
}



module.exports = {
        getAllBookings,
        createBooking,
        getBooking,
        deleteBooking,
        updateBooking
}