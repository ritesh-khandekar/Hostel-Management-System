module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
    var router = require("express").Router();

    router.get("/", admin.status);

    router.get("/complaints", admin.complaints);
    router.post("/complaints", admin.filtered);
    router.post("/complaints/modify", admin.getAction);

    router.post("/login", admin.login);
    router.post("/create",admin.create);

    // router.get("/status",admin.adminStatus);

    app.use('/admin', router);
  };