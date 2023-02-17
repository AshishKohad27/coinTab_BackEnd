const { Schema, model } = require("mongoose");

const dataSchema = new Schema({
    gender: {
        type: String,
        require: true,
    },
    name: {
        title: String,
        first: String,
        last: String,
    },
    location: {
        street: {
            number: Number,
            name: String,
        },
        city: String,
        state: String,
        country: String,
        postcode: String,
        coordinates: {
            latitude: String,
            longitude: String,
        },
        timezone: {
            offset: String,
            description: String,
        },
    },
    email: String,
    login: {
        uuid: String,
        username: String,
        password: String,
        salt: String,
        md5: String,
        sha1: String,
        sha256: String,
    },
    dob: {
        date: String,
        age: { type: Number, default: 0 },
    },
    registered: {
        date: String,
        age: { type: Number, default: 0 },
    },
    phone: String,
    cell: String,
    // "id": {
    //     name: String,
    //     value: String,
    // },
    picture: {
        large: String,
        medium: String,
        thumbnail: String,
    },
    nat: String,
});

const dataModel = model("data", dataSchema);

module.exports = dataModel;
