const db = require("../models");
const sendMail = require("../mailer/sendmail");
const session = require("express-session");

const Students = db.students;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

	if (!req.body.email || !req.body.password) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	const user = {
		email: req.body.email,
		password: req.body.password,
	};

	Students.create(user)
		.then(data => {
			sendMail(user.email);
			let session = req.session;
			session.email = user.email;
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the User."
			});
		});
};

exports.findAll = (req, res) => {
	const email = req.query.email;
	var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
	Students.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials."
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Students.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find User with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving User with id=" + id
			});
		});
};