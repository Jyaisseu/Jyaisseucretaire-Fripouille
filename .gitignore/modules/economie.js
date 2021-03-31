const mongoose = require(`mongoose`);

const Xpshema = mongoose.Schema({
    User_ID: String,
    pseudo: String,
    xp: Number,
    level: Number,
    total: Number
})

module.exports = mongoose.model("economie", Xpshema)
