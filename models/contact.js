const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    phone: {type: String},
    email: {type: String, required: true},
    date: {type: Date, default: Date.now},
    length: {type: Number},
    message: {type: String, required: true, maxlength: 500}
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;