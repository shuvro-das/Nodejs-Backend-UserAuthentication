//importing
const express = require('express');
const mongoose = require('mongoose');



//import Routes
const authRouth = require('./routes/auth');
const postRoute = require('./routes/posts');


//app config

const app = express();
const port = process.env.PORT || 9000




//middleware
app.use(express.json());

//Route Middleware
app.use('/api/user', authRouth);
app.use('/api/posts', postRoute);




//DB config
const Url = "mongodb+srv://admin:qnKA5nYyfhGQZ9rH@cluster0.vfqse.mongodb.net/user?retryWrites=true&w=majority";
mongoose.connect( Url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('connected to db'));



//Routes




//Listen
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})


// 