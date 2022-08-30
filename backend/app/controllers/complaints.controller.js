const db = require("../models");
const sendMail = require("../mailer/sendmail");
const { checkLogin, getAdminNames } = require("../methods/methods");
const Complaints = db.complaint;
const Admins = db.admins;
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

var res_json = {
	"login": false
}


exports.create = (req, res) => {
	if (!checkLogin(req)) {
		res.status(401).send(res_json);
		return;
	}
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
	user_session = req.session;
	Admins.findOne({
		where: {
			level: "1"
		}
	}).then(admin_data => {
		if (admin_data) {
			const complaint = {
				complaint_id: genRanHex(10),
				name: user_session.name,
				roll_number: user_session.roll_number,
				hostel_number: user_session.hostel_number,
				room_number: user_session.room_number,
				issue_type: req.body.issue_type,
				problem: req.body.problem,
				handler_name: admin_data.name,
				level: admin_data.level
			};

			Complaints.findOne({
				where: {
					complaint_id: complaint["complaint_id"]
				}
			}).then(data => {
				if (data) {
					complaint["complaint_id"] = genRanHex(10);
				}
				Complaints.create(complaint)
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
			}).catch(err => {
				res.status(500).send({
					message:
						err.message || "Some error occurred while creating complaints."
				});
			})
		}
	}).catch(err => {
		res.status(500).send({
			message:
				err.message || "Some error occurred while creating complaint."
		});
	})


};

exports.findAll = (req, res) => {
	if(!checkLogin(req)){
		res.status(500).send({
			login: false
		})
	}
	Complaints.findAll({
		where:
		{
			roll_number: req.session.roll_number,
			name: req.session.name
		}
	})
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
	Complaints.findByPk(id)
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