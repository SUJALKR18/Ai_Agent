const mongoose = require('mongoose');   

const projectSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        unique : true,
        lowercase: true,
    },
    users : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',      
        }
    ],
});

module.exports = mongoose.model('project' , projectSchema);
