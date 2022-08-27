const db = require("../models");
const sendMail = require("../mailer/sendmail");
const session = require("express-session");

const Complaint = db.complaint;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
	if (!req.body.name) {
		for (key in req.body) {
			if (!req.body[key]) {
				res.status(400).send({
					message: "Please enter " + key
				});
				break;
			}
		}
		return;
	}

	const complaint = {
		name: req.body.name,
		roll_number: req.body.roll_number,
		hostel_number: req.body.hostel_number,
		room_number: req.body.room_number,
		issue_type: req.body.issue_type,
		problem: req.body.problem
	};
	session = req.session;
	if (session.login) {
		Complaint.create(complaint)
			.then(data => {
				data = {}
				data["success"] = true;
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || "Some error occurred while creating the complaint."
				});
			});
	} else {
		res.status(400).send({
			message: "Please login!"
		});
	}
};

exports.findAll = (req, res) => {
	const email = req.query.email;
	var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
	Complaint.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving complaints."
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Complaint.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find complaint with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving complaint with id=" + id
			});
		});
};