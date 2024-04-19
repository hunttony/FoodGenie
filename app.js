const express = require('express');
const bodyParser = require('body-parser');



const indexRoutes = require('./src/routes/index');
const dbRouter = require('./src/routes/dbRouter');
const subscribers = require('./src/routes/subscribe');
const contacts = require('./src/routes/contact');
const investors = require('./src/routes/investor');
const employmentapps = require('./src/routes/employmentapp');
const greatSearch = require('./src/routes/greats');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(  'public'));
app.use(express.json());
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', indexRoutes);
app.use('/api/db', dbRouter);
app.use('/subscribe', subscribers);
app.use('/contact', contacts);
app.use('/investor', investors);
app.use('/employmentapp',employmentapps);
app.use('/great', greatSearch);


// application of http server



// Start the server
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server is running on port ${PORT}`);
});
