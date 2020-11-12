// importing modules from index.js file
const { db, syncAndSeed, models: { User } } = require('./db');
// importing express
const express = require('express');
// importing path
const path = require('path');

const app = express();

// middleware (func invoked by express.js, before final request is invoked. Sits in MIDDLE of the raw req and the final intended route)
// .use() registers some func to run for each incoming req
    // express.urlencoded parses(breaksdown) incoming requests with urlencoded payload(actual intended message) - returns an object
app.use(express.urlencoded({ extended: false }));
app.use(require('method-override')('_method'));

// retrieving styles sheet and sending file as a responce
app.get('/styles.css', (req, res)=> res.sendFile(path.join(__dirname, 'styles.css')));

// any request for the '/' directory will be redirected to '/users' directory
app.get('/', (req, res)=> res.redirect('/users'));

// when request comes from '/users', the users.js file is imported
app.use('/users', require('./routes/users'));


const init = async()=> {
  try{
    await db.authenticate(); // authenticate function tests if connection to database is OK
    if(process.env.SYNC) {
      await syncAndSeed();
    }
    const port = process.env.PORT || 1337;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex) {
    console.log(ex);
  }
}


init();
