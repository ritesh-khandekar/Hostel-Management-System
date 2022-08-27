module.exports = (sequelize, Sequelize) => {
    const Students = sequelize.define("students", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      }
    });
    return Students;
  };