const mongoose = require('mongoose');

async function connect (){
    try {
        await mongoose.connect('mongodb://localhost:27017/mystore_db_dev', {
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log("Connect database mongodb successfully!!!")
    } catch (error) {
        console.log("connect database mongodb failure!!!")
        
    }
}

module.exports = {connect}