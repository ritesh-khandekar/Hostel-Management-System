const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const db = require("./app/models");
const session = require("express-session");

var corsOptions = {
  origin: "http://localhost:3000"
};
var oneDay = 1000 * 60 * 60 * 24;

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(session({
  secret: "secretsalt",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}))

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Routes
require("./app/routes/students.routes")(app);

app.get("/", (req, res) => {
  let session = req.session;
  let res_json = {
    "message":"Welcome to the Application"
  }
  for(key in session){
    res_json[key] = session[key];
  }
  res.json(res_json);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});