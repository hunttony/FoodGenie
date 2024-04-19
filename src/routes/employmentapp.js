const express = require('express');
const router = express.Router();
const dbHandler = require('../lib/dbHandler');


router.post('/employmentapp', async (req, res) => {
  const { name, email, phone, days_available, hours_available, previous_employer, previous_position, previous_duration } = req.body;
  if (!name || !email || !phone || !days_available || !hours_available || !previous_employer || !previous_position || !previous_duration)  {
    return res.status(400).send('All fields are required'); 
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format');
  }
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).send('Invalid phone number format');
  }

  try {
    // Read existing contact form submissions from the database
    let data = await dbHandler.readDb();

    // Parse the data if it's a string
    let dbData;
    if (typeof data === 'string') {s
      dbData = JSON.parse(data);
    } else {
      dbData = data; // Use the data directly if it's already an object
    }

    // Extract the "contact" property
    const { employmentapp } = dbData || { employmentapp: [] };

    // Add the new submission to the array
    employmentapp.push({  name, email, phone, days_available, hours_available, previous_employer, previous_position, previous_duration  });

    // Write the updated submissions back to the database
    await dbHandler.writeDb({ ...dbData, employmentapp });

    // Render the contactSuccess.ejs page with the success message and submitted data
    res.render('components/employmentappSuccess', {  name, email, phone, days_available, hours_available, previous_employer, previous_position, previous_duration  });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Internal Server Error');
  }
});





module.exports = router