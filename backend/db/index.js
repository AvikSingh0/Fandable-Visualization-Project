const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const PostModel = require("./models/post");


const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'example';
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME || 'tasks';


async function connect() {
  if (process.env.NODE_ENV === 'test') {
    const mongod = await MongoMemoryServer.create();
    MONGO_URI = mongod.getUri();
  } else {
    MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`;
  }

  console.log('MONGO URI', MONGO_URI)

  mongoose.set('strictQuery', false)

  mongoose
    .connect(MONGO_URI, {
    //   dbName: MONGO_DATABASE_NAME,
    //   user: MONGO_USERNAME,
    //   pass: MONGO_PASSWORD
    })
    .then(
      () => {
        console.log(
          `Running mongodb instance at port ${MONGO_PORT} and host ${MONGO_HOSTNAME}`
        )

        // app.set('port', PORT)
        // app.listen(PORT, () => {
        //   console.log(`Listening on port: ${PORT}`)
        // })
      },
      (err) => {
        console.error(`Unable to start mongo at ${MONGO_URI}`)
        console.error(err)
      }
    )
}
async function close() {
  await mongoose.disconnect()
}

module.exports = { connect, close }