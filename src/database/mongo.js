const mongoose = require('mongoose')
const uri = process.env.MONGO_URI 

try {
    mongoose.connect(
        uri,
        {
            useNewUrlParser: true
        }
    );
} catch(err) {
    console.log(err)
}
