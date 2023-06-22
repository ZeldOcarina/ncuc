'use strict';

const mongoose = require('mongoose');

let conn = null;

const uri = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@adyproduction.5cosb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

exports.connect = async function () {
    mongoose.set('strictQuery', false);
    if (conn == null) {
        conn = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        }).then(() => mongoose);

        // `await`ing connection after assigning to the `conn` variable
        // to avoid multiple function calls creating new connections
        await conn;
    }

    return conn;
};