const express = require("express");
const app = express();

const bookingRouter = require('./routes/bookingRoutes');

app.use(express.json())
app.use('/api/v1/bookings',bookingRouter);

module.exports =  app;
