module.exports = app => {
    const students = require("../controllers/students.controller.js");
    var router = require("express").Router();
    
    // router.post("/", students.create);
    router.get("/", students.login_status);
    router.post("/login", students.login);

    app.use('/students', router);
  };