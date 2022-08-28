module.exports = (sequelize, Sequelize) => {
    const Admins = sequelize.define("admins", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      }
    });
    return Admins;
  };