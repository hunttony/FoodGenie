const express = require('express');
const router = express.Router();
const dbHandler = require('../lib/dbHandler');



/*const menuMod = require('./menuMod'); */



router.get('/', async function(req, res) {
  
  try {
    // Fetch menu items from the database
    const menuCategories = await dbHandler.getAllMenuItems();
    console.log('made it here too');
    // Render the 'scroller.ejs' view and pass menuItems data to it
    res.render('index', { title: 'Your Restaurant', menuCategories: menuCategories });
  } catch (error) {
    // Handle errors gracefully
    console.error('Error fetching menu items:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/about', function(req, res) {
  res.render('components/about', { title: 'Your Restaurant | About' });
});

router.get('/contact', function(req, res) {
  res.render('components/contact', { title: 'Your Restaurant | Contact Us' });
});

router.get('/investor', function(req, res) {
  res.render('components/investor', { title: 'Your Restaurant | Investors' });
});

router.get('/order', function(req, res) {
  res.render('components/orders', { title: 'Your Restaurant | Place Your Order' });
});

router.get('/employment', function(req, res) {
  res.render('components/employmentapp', { title: 'Your Restaurant | Get Hired!' });
});









module.exports = router
