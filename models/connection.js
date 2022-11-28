const mongoose = require('mongoose');

const connectionString = "mongodb+srv://xou:sEnI1HqN5Rb8i6Ea@cluster0.mywbssa.mongodb.net/ouioui"

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))
 .catch(error => console.error(error))