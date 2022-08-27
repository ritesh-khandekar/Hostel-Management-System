module.exports = app => {
    const complaints = require("../controllers/complaints.controller.js");
    var router = require("express").Router();
    
    router.post("/", complaints.create);
    router.get("/", complaints.findAll);

    app.use('/api/complaints', router);
  };