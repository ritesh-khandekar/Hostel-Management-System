module.exports = (sequelize, Sequelize) => {
    const Complaints = sequelize.define("complaints", {
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
      },
      issue_type: {
        type: Sequelize.STRING
      }
    });
    return Complaints;
  };