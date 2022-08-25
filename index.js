const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const mongoose = require("mongoose");
const { create } = require("express-handlebars");
const path = require("path");
const uri =
  "mongodb+srv://Alimov_1:PCNHrcIKi1Wxufg6@cluster0.qa2s8y6.mongodb.net/kusina";
const global = require("./pages/global.json");

// require
const homeRouter = require("./routes/home");
const aboutRouter = require("./routes/about");
const specialtiesRouter = require("./routes/specialties");
const reservationRouter = require("./routes/reservation");
const storiesRouter = require("./routes/stories");
const contactRouter = require("./routes/contact");

const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: "./views/layouts",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

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
app.use(express.static(path.join(__dirname, "public")));

const title = global.title;
const description = global.description;

function mid(req, res, next) {
  res.locals.title = title;
  res.locals.description = description;

  next();
}

//routing
app.use("/", mid, homeRouter);
app.use("/about", mid, aboutRouter);
app.use("/specialties", mid, specialtiesRouter);
app.use("/reservation", mid, reservationRouter);
app.use("/stories", mid, storiesRouter);
app.use("/contact", mid, contactRouter);

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
