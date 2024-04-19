const express = require('express');
const router = express.Router();
const dbHandler = require('../lib/dbHandler');


router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format');
  }

  try {
    // Read existing subscribers from the database
    let data = await dbHandler.readDb();

    // Parse the data if it's a string
    let dbData;
    if (typeof data === 'string') {
      dbData = JSON.parse(data);
    } else {
      dbData = data; // Use the data directly if it's already an object
    }

    // Extract the "subscribe" property
    const { subscribe } = dbData || { subscribe: [] };

    // Check if email already exists
    const existingSubscriber = subscribe.find(subscriber => subscriber.email === email);
    if (existingSubscriber) {
      return res.status(400).send('Email is already subscribed');
    }

    // Add the new subscriber to the array
    subscribe.push({ email });

    // Write the updated subscribers back to the database
    await dbHandler.writeDb({ ...dbData, subscribe });

    res.render('components/subscribeSuccess', { email});
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router