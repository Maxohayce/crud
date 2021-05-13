const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://Dubem:Dubem2310@datafetch.lc03k.mongodb.net/crud?retryWrites=true&w=majority';



module.exports = function() {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('database connection successful')
        }
    });
}