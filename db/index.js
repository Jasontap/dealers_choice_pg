// importing sequelize module
const Sequelize = require('sequelize');
// importing faker module - provides filler content text
const faker = require('faker');

// importing dataypes (string , text)
const { STRING, TEXT } = Sequelize;
// creating a sequelize instance by passing a connection URI
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/coffee_atlas_db');

const Coffee = db.define('coffee', {  //define() - used to define a model "Coffee" which will create a table "coffe" arguments= (modelName, attributes, options)
  name: {
    type: STRING,
    allowNull: false
  },
  history: {
    type: TEXT,
    allowNull: false
  },
  tasting_notes: {
    type: TEXT,
    allowNull: false
  },
  tasting_profile: {
    type: TEXT,
    allowNull: false
  }
}); 


const syncAndSeed = async()=> {
  await db.sync({ force: true });   //Sequelize automatically performs a SQL query to the DB - force: true creates table, dropping it first if it already exists
  await Coffee.create({ name: 'Ethiopia', history: 'Legend has it that when Kaldi, a goat farmer from the 9th century, found his goats acting suspiciously jittery, he traced their liveliness to their consumption of mystery berries, also known as coffee cherries. And so the progression to modern day coffee slowly began...', tasting_notes: 'This is one of the most unique coffee flavor profiles in the world, featuring tasting notes of sweet blueberry & chocolate paired with a low acidity, making a wonderfully smooth cup. Coffee from the Guji zone in Ethiopia is highly regarded by the specialty coffee world for its renowned quality and distinct flavor profile. Enjoy.', tasting_profile: 'Raspberry Blueberry Sweet Chocolate' });   // .create() - creates a new instance of User in the database
  await Coffee.create({ name: 'Brazil', history: 'Coffee was introduced to Brazil by French settlers in the early 18th century. Starting in the northern region of Brazil, coffee ​plantations began to expand down the coast, quickly surpassing sugar-cane, the predominant industry at that time. By 1840, Brazil was the largest coffee producer in the world.', tasting_notes: 'This batch brews complexity at its finest. With each cup, enjoy a fruitiness resembling coconut paired with a rich chocolate and nutty combination delivering a flavor similar to German Chocolate Cake with a hint of vanilla as it finishes.', tasting_profile: 'Coconut Chocolate Vanilla' });
  await Coffee.create({ name: 'Costa Rica', history: 'Arabica was the first coffee planted in Costa Rica toward the end of the 1700s. Although widespread cultivation in the country was slow, Costa Rica eventually became the first Central American country to have a coffee industry. By 1829, Costa Rican coffee was the desire of many foreign buyers, quickly surpassing Costa Ricas main exports (cacao, tobacco, sugar).', tasting_notes: 'Altitude, climate, and soil combine wonderfully to create world-renowned coffee growing conditions. These natural elements and years of developed farming practices produce exceptional coffee that we get to enjoy today. This month: a milky, chocolatey, and syrupy selection with notes of milk chocolate, black tea, and sweet cream.', tasting_profile: 'Milk Chocolate Sweet Cream' });
  await Coffee.create({ name: 'Peru', history: 'Welcome to Peru, one of the fastest growing coffee countries in the world. Much of Perus quick rise can be attributed to Peru’s ideal coffee growing environment. Over 75% of the coffee produced in Peru is shade grown at high altitude and is hand-picked by small lot farmers, making it some of the most sought-after coffee in the world.', tasting_notes: 'Enjoy delicious and full-bodied notes of toffee, caramel, and chocolate with this freshly roasted and rich batch of Peruvian coffee. As a robust and sweet cup, this balanced brew supplies quintessential qualities of an exceptional coffee.', tasting_profile: 'Toffee Chocolate' });
  await Coffee.create({ name: 'Columbia', history: 'With over 500,000 farmers spanning across 2.2 million acres, coffee production in Colombia is deeply woven into culture. Unlike other areas that mass-produce, youll find most of the coffee in Colombia is shade-grown and hand-picked, making it some of the highest quality coffee in the world.', tasting_notes: 'This selection from Colombia lasts long after first sip. As this succulent coffee sticks to your tongue, delight in a subtle sweet touch of acidity similar to a plum or grape paired with flavors of graham cracker and toasted marshmallow like smores.', tasting_profile: 'Plum & Grape Graham Cracker Toasted Marshmallow' });
  await Coffee.create({ name: 'Indonesia', history: 'Indonesian geography is ideal for coffee growing. It’s located near the equator and has numerous mountainous regions across the islands which creates several coffee friendly micro-climates for growth. Now the fourth largest coffee producer in the world, Indonesia was the first place outside of Arabia and Ethiopia where coffee was widely cultivated​.', tasting_notes: 'Sumatran coffee is known for its uniquely complex flavor that stems from the distinctive way it is processed called “wet hulling.” Notes of cocoa, tobacco, smoke, earth and cedar wood are just a few of the signature​ tasting notes typically found in Sumatran coffee.', tasting_profile: 'Earthy Bell Pepper Rich Chocolate ' });
  await Coffee.create({ name: 'Guatemala', history: 'First introduced in the 18th century by European missionaries, coffee in Guatemala has since grown to be the worlds 10th largest coffee producing country. With exceptional coffee growing conditions like rich soil, dependable rains, and proper altitudes, coffee grown in Guatemala stands out as a leader among specialty coffee producers and coffee drinkers alike.', tasting_notes: 'Located in western Guatemala, the Huehuetenango region is famous for producing some of the highest quality coffee in the world. Find out why with this wonderful selection that brews a remarkable cup of coffee with cherry-like acidity and flavor notes of smooth milk chocolate.', tasting_profile: 'Cherry Chocolate' });
  await Coffee.create({ name: 'kenya', history: 'Some of the best coffee in the world is grown in the highlands of Kenya. The high quality is attributed to the rich volcanic soil that gives nutrients to coffee plants. Kenyans take coffee cultivation very seriously, paying close attention throughout the perfected systematic process to ensure quality.', tasting_notes: 'Kenya Twiga AA is considered to be some of the world’s best coffee. As a wonderfully complex cup, this coffee boasts juicy notes of sweet-citrus, full-bodied chocolate, and a subtle zesty kick as it finishes. A truly exceptional, exciting, and vibrant coffee.', tasting_profile: 'Grapefruit Citrus Chocolate' });
  await Coffee.create({ name: 'Honduras', history: 'Hondurans are immensely proud of their coffee and its history, with good reason! With a heavy mouthfeel reminiscent of milk and honey and tastes of dark chocolate and graham crackers, we knew at first sip that we had to share this special batch with our coffee travelers.', tasting_notes: 'This Ethiopian coffee comes from the Sidamo region and is one of our highest rated batches with notes of dark chocolate, blueberries and a hint of honey. Naturally processed and meticulously dried over 2 weeks to help hold in the berry and dark chocolate flavors, its one of our personal favorites and hopefully will become one of yours.', tasting_profile: 'Dark Chocolate Graham Cracker' });
}                         // calling await Coffee.save() after updating a field of an instance, will update the DB

// syncAndSeed();

module.exports = {
  db,
  syncAndSeed,
  models: {
    Coffee
  }
}


