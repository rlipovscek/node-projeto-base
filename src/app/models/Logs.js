const _mongoose = require("mongoose");
const Schema = _mongoose.Schema;

const LogSchema = new Schema({
    data_log: {
        type: Date,
        default: new Date()  
    },
    log: {
        type: String,
        required: true
    },
    origem: {
        type: String,
        required: true
    }
});

module.exports =  _mongoose.model("Log", LogSchema);