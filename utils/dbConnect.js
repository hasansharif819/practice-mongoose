const { MongoClient, ServerApiVersion } = require('mongodb');
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

// const uri = "mongodb+srv://sharifhasan819:<password>@cluster0.aynjxck.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }
            dbConnection = db.db("test");
            console.log("Successfully connect the database".yellow.bold);

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },
};


/**
 * *****************Database Connect*******************
*/
// import { MongoClient } from "mongodb";

// const connectionString = process.env.ATLAS_URI || "";

// const client = new MongoClient(connectionString);

// let conn;
// try {
//   conn = await client.connect();
// } catch(e) {
//   console.error(e);
// }

// let db = conn.db("sample_training");

// export default db;


//mongodb connect
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sharifhasan819:<password>@cluster0.aynjxck.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
// //   perform actions on the collection object
//   client.close();
// });