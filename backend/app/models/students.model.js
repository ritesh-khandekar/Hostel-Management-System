module.exports = (sequelize, Sequelize) => {
    const Students = sequelize.define("students", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      roll_number: {
        type: Sequelize.STRING
      },
      hostel_number: {
        type: Sequelize.STRING
      },
      room_number: {
        type: Sequelize.STRING
      }
    });
    return Students;
  };