const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const mongoose = require("mongoose");
const { create } = require("express-handlebars");
const path = require('path')
const uri = 'mongodb+srv://Alimov_1:PCNHrcIKi1Wxufg6@cluster0.qa2s8y6.mongodb.net/kusina'


// require
const homeRouter = require('./routes/home')
  
const hbs = create({
  extname: 'hbs',
  defaultLayout:'layout',
  layoutsDir:'./views/layouts',
  runtimeOptions: {
    allowProtoPropertiesByDefault:true,
    allowProtoPropertiesByDefault:true
  }
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')



async function db() {
  try {
    await mongoose.connect(uri, (err) => {
      if (err) throw new Error(err);
      console.log("MongoDB connected", uri);
    });
  } catch (error) {
    console.log(error);
  }
}


db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routing
app.use('/',homeRouter)

const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

  app.listen(port, () => {
    console.log("Server working on port", port);
  });


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
