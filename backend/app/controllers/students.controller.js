const db = require("../models");
const sendMail = require("../mailer/sendmail");
const session = require("express-session");
const { checkLogin } = require("../methods/methods");

const Students = db.students;
const Op = db.Sequelize.Op;
const res_json = {
	"login": false
}

exports.create = (req, res) => {

 	if (!req.body.email || !req.body.password || !req.body.name || !req.body.roll_number || !req.body.hostel_number || !req.room_number) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	const user = {
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		roll_number: req.body.roll_number,
		hostel_number: req.body.hostel_number,
		room_number: req.body.room_number,
	};

	Students.create(user)
		.then(data => {
			// sendMail(user.email);
			let session = req.session;
			session.student_login = true;
			session.name = data.name;
			session.roll_number = data.roll_number;
			session.hostel_number = data.hostel_number;
			session.room_number = data.room_number;
			session.email = data.email;
			
			data = {}
			data["login"] = true
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Student."
			});
		});
};

exports.login_status = (req, res) => {
	if (checkLogin(req)) {
		res_json["login"] = true;
	}
	res.status(401).send(res_json)
}

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
					err.message || "Some error occurred while retrieving Student."
			});
		});
};

exports.login = (req, res) => {
	Students.findOne({
		where: {
			email: req.body.email,
			password: req.body.password
		}
	})
		.then(data => {
			if (data) {
				session = req.session;

				session.student_login = true;
				session.name = data.name;
				session.roll_number = data.roll_number;
				session.hostel_number = data.hostel_number;
				session.room_number = data.room_number;
				session.email = data.email;

				data = {}
				data["success"] = true;
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Student with email ${req.body.email}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Student with email " + req.body.email
			});
		});
};