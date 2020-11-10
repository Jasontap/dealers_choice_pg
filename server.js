const { db, syncAndSeed, models: { User } } = require('./db');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(require('method-override')('_method'));

app.get('/styles.css', (req, res)=> res.sendFile(path.join(__dirname, 'styles.css')));

app.get('/', (req, res)=> res.redirect('/users'));

app.use('/users', require('./routes/users'));

const init = async()=> {
  try{
    await db.authenticate();
    if(process.env.SYNC) {
      await syncAndSeed();
    }
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex) {
    console.log(ex);
  }
}


init();



/*

//THIS IS THE POSTGRES METHOD WITHOUT USING SEQUELIZE!!
const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost/acme_users_db');

const syncAndSeed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS "Users";
    CREATE TABLE "Users"(
      id SERIAL PRIMARY KEY,
      email VARCHAR(50) NOT NULL UNIQUE
    );
  `;
  await client.query(SQL);
}

const getUsers = async()=> {
  return (await client.query('SELECT * FROM "Users";')).rows;
}

const createUser = async({ email })=> {
  return(await client.query('INSERT INTO "Users"(email) VALUES($1) RETURNING *', [email])).rows[0];
};

const init = async()=> {
  try {
    await client.connect();
    await syncAndSeed();
    const user = await createUser({ email: 'moe' });
    console.log(await getUsers());
  }
  catch(ex) {
    console.log(ex);

  }
}

init();
*/