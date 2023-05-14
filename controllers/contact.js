const express = require('express');
const router = express.Router();

const Contact = require('../models/contact.js');

router.post('/', async (req, res) => {

  // Check if all required fields are present
  if (!req.body.message || !req.body.email || !req.body.lName || !req.body.fName) {
    return res.status(400).send({
      message: 'All fields are required.'
    });
  }

  try {
    const contact = new Contact(req.body);
    const createdContact = await contact.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'There was an error saving the contact.',
      error: error
    });
  }
});

module.exports = router;
