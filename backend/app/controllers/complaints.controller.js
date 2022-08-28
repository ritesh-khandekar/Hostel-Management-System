const db = require("../models");
const sendMail = require("../mailer/sendmail");
const { checkLogin , getAdminNames } = require("../methods/methods")
const Complaints = db.complaint;
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

var res_json = {
	"login": false
}


exports.create = (req, res) => {
	if(!checkLogin(req)){
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

	const complaint = {
		complaint_id: genRanHex(10),
		name: req.body.name,
		roll_number: req.body.roll_number,
		hostel_number: req.body.hostel_number,
		room_number: req.body.room_number,
		issue_type: req.body.issue_type,
		problem: req.body.problem,
		handler_name: getAdminNames()[0],
		level: "1"
	};
	if (checkLogin(req)) {
		Complaints.findOne({
			where: {
				complaint_id: complaint[complaint_id]
			}
		}).then(data => {
			if (data) {
				complaint[complaint_id] = genRanHex(10);
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
		})
	} else {
		res.status(401).send(res_json);
	}
};

exports.findAll = (req, res) => {
	Complaints.findAll()
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