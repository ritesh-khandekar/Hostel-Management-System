module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
    var router = require("express").Router();

    router.get("/", admin.status);
    router.get("/complaints", admin.complaints);
    router.post("/complaints", admin.filtered);
    router.post("/complaints/modify/:complaint_id/:complaint_status", admin.getAction);
    router.post("/login", admin.login);

    // router.get("/complaints", admin.complaints);

    app.use('/admin', router);
  };