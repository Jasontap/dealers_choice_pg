// importing sequelize module
const Sequelize = require('sequelize');
// importing faker module - provides filler content text
const faker = require('faker');

// importing dataypes (string , text)
const { STRING, TEXT } = Sequelize;
// creating a sequelize instance by passing a connection URI
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_users_db');

const User = db.define('User', {  //define() - used to define a model "User" which will create a table "Users" arguments= (modelName, attributes, options)
  email: {          // email is a column
    type: STRING,   // every column must have a data type
    allowNull: false, // does not allow a Null value
    validate: {
      isEmail: true     // must be an email
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
  await db.sync({ force: true });   //Sequelize automatically performs a SQL query to the DB - force: true creates table, dropping it first if it already exists
  await User.create({ email: 'moe@gmail.com', bio: 'This is bio for Moe' });
  await User.create({ email: 'lucy@gmail.com' });   // .create() - creates a new instance of User in the database
  await User.create({ email: 'athyl@gmail.com' });
}                         // calling await User.save() after updating a field of an instance, will update the DB

module.exports = {
  db,
  syncAndSeed,
  models: {
    User
  }
}


