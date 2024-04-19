const express = require('express');
const router = express.Router();
const dbHandler = require('../lib/dbHandler');


router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).send('All fields are required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format');
  }

  try {
    // Read existing contact form submissions from the database
    let data = await dbHandler.readDb();

    // Parse the data if it's a string
    let dbData;
    if (typeof data === 'string') {
      dbData = JSON.parse(data);
    } else {
      dbData = data; // Use the data directly if it's already an object
    }

    // Extract the "contact" property
    const { contact } = dbData || { contact: [] };

    // Add the new submission to the array
    contact.push({ name, email, subject, message });

    // Write the updated submissions back to the database
    await dbHandler.writeDb({ ...dbData, contact });

    // Render the contactSuccess.ejs page with the success message and submitted data
    res.render('components/formSuccess', { name, email, subject, message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Internal Server Error');
  }
});





module.exports = router