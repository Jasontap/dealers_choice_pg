const { models: { Coffee } } = require('../db');
const app = require('express').Router();



app.delete('/:id', async(req, res, next)=> {
  try {
    const coffee = await Coffee.findByPk(req.params.id);
    await coffee.destroy();
    res.redirect('/coffee');
  }
  catch(ex) {
    next(ex);
  }
})

app.post('/', async(req, res, next)=> {
  try{
    const coffee = await Coffee.create(req.body);
    res.redirect(`/coffee/${ coffee.id }`);
  }
  catch(ex) {
    next(ex);
  }
})

app.get('/', async(req, res, next)=> {
  try{
    const coffee = await Coffee.findAll();
    res.send(`
      <html>
        <head>
          <link rel='stylesheet' href='/styles.css' />
        </head>
        <body>
        <div>
          <h1>Coffee Atlas</h1>
        </div>
        <p>
          Exotic coffees you can't
          find anywhere online or on the shelf.
        </p>
        <h3>Here are ${ coffee.length } coffees for you to try!</h3>
          <ul>
            ${ coffee.map( coffee => `
              <li>
                <a href='/coffee/${ coffee.id }'>
                  ${ coffee.name }
                </a>
              </li>
            `).join('')}
          </ul>
          <form method='POST' id='coffee-form'>
            <h4>Add a coffee to the list!</h4>
            <p>Coffee Name</p>
              <input name='name'/>
            <p>History</p>
              <textarea name='history'></textarea>
            <p>Tasting Notes</p>
              <textarea name='tasting_notes'></textarea>
            <p>Tasting Profile</p>
              <textarea name='tasting_profile'></textarea>
            <span>
              <button>Create</button>
            </span>
          </form>
          </body>
      </html>
    `);
  }
  catch(ex) {
    next(ex);
  }
})

app.get('/:id', async(req, res, next)=> {
  try{
    const coffee = await Coffee.findByPk(req.params.id);
    res.send(`
      <html>
        <head>
          <link rel='stylesheet' href='/styles.css' />
        </head>
        <body>
          <h1>Coffee Atlas</h1>
          <h2>${ coffee.name }</h2>
            <a href='/coffee'>
              back
            </a>
            <div class='details'>
            <h4>History</h4>
              <p>
                ${ coffee.history }
              </p>
              <h4>Tasting Notes</h4>
              <p>
                ${ coffee.tasting_notes }
              </p>
              <h4>Tasting Profile</h4>
              <P>
                ${ coffee.tasting_profile }
              </p>
              <form method='POST' action='/coffee/${ coffee.id }?_method=DELETE'>
              <button id='deletion'>
                <p>xxx--- Delete this Coffee...if you dare ---xxx</p>
              </button>
              </form>
            </div>
        </body>
      </html>
    `);
  }
  catch(ex) {
    next(ex)
  }
})


module.exports = app;