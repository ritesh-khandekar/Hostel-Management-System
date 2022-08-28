module.exports = (sequelize, Sequelize) => {
    const Complaints = sequelize.define("complaints", {
      complaint_id: {
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
      },
      issue_type: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      handler_name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
    });
    return Complaints;
  };