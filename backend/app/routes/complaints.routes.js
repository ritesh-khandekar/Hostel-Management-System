module.exports = app => {
    const complaints = require("../controllers/complaints.controller");
    var router = require("express").Router();
    
    router.post("/", complaints.create);
    router.get("/", complaints.findAll);

    app.use('/complaints', router);
  };