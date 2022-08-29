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
      },
      solved: {
        type: Sequelize.INTEGER
      }
    });
    return Admins;
  };