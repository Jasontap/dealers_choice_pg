const Sequelize = require('sequelize');
const faker = require('faker');
const { STRING, TEXT } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_users_db');

const User = db.define('User', {  //define will start to run sql commands such as creating a table and some table detials
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  bio: {
    type: TEXT
  }
}); 

User.beforeSave( user => {
  if(!user.bio) {
    user.bio = `${user.email} BIO is ${faker.lorem.paragraphs(3)}`;
  }
})

const syncAndSeed = async()=> {
  await db.sync({ force: true });
  await User.create({ email: 'moe@gmail.com', bio: 'This is bio for Moe' });
  await User.create({ email: 'lucy@gmail.com' });
  await User.create({ email: 'athyl@gmail.com' });
}

module.exports = {
  db,
  syncAndSeed,
  models: {
    User
  }
}



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