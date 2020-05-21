const { MongoClient } = require('mongodb')

const connection = process.env.MONGODB_URL

const connectDb = (callback) => {
    MongoClient.connect(
        connection,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        callback
    )
}

module.exports = connectDb