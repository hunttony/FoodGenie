const fs = require('fs').promises;
const path = require('path');

// Assuming your JSON DB file path
const DB_PATH = path.join(__dirname, '..', '/config/db.json');

// Function to read the database
async function readDb() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading from database:', error);
    throw error; // Re-throw the error or handle it as needed
  }
}

// Function to write the updated data back to the database
async function writeDb(newData) {
  try {
    // Read existing data from the database
    const existingData = await readDb();

    // Merge the existing data with the new data
    const updatedData = { ...existingData, ...newData };

    // Write the updated data back to the database file
    await fs.writeFile(DB_PATH, JSON.stringify(updatedData, null, 2), 'utf8');

    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
}

async function getAllMenuItems() {
  try {
    const db = await readDb();
    return db.menuCategories || [];
  } catch (err) {
    throw new Error('Failed to read menu items from the database');
  }
}

async function addMenuItem(menuItemData) {
  try {
    // Read existing menu items from the database
    const data = await fs.readFile(DB_PATH);
    const menuItems = JSON.parse(data);
    
    // Add the new menu item to the array
    menuItems.push(menuItemData);
    
    // Write the updated menu items back to the database
    await fs.writeFile(DB_PATH, JSON.stringify(menuItems));
    
    return menuItemData;
  } catch (err) {
    throw new Error('Failed to add menu item to the database');
  }
}


// Consolidating all exports into a single module.exports
module.exports = {
  readDb,
  writeDb,
  getAllMenuItems,
  addMenuItem
};
