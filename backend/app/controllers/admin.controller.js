const db = require("../models");
const { checkAdminLogin } = require("../methods/methods");
const session = require("express-session");
const Admins = db.admins;
const Op = db.Sequelize.Op;

var res_json = {
	"login": false
}

exports.status = (req, res) => {
	if (checkAdminLogin(req)) {
		res_json["login"] = true;
		res_json["ADMIN_LEVEL"] = req.session.ADMIN_LEVEL;
	}
	res.status(401).send(res_json);
}
exports.create = (req, res) => {
	Admins.create({
			email: req.body.email,
			password: req.body.password,
			level: req.body.level,
			name: req.body.name
	}).then(data => {
		res.send(data)
	})
}
exports.login = (req, res) => {
	Admins.findOne({
		where: {
			email: req.body.email,
			password: req.body.password
		}
	})
		.then(data => {
			if (data) {
				session = req.session;
				session.admin_login = true;
				session.name = data.name;
				session.email = data.email;
				session.ADMIN_LEVEL = data.level;
				data = {}
				data["success"] = true;
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Admin with email ${req.body.email}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Admin with email " + req.body.email
			});
		});
};

exports.complaints = (req, res) => {
	if (!checkAdminLogin(req)) {
		res.status(401).send(res_json);
		return;
	}
	ADMIN_LEVEL = req.session.ADMIN_LEVEL;
	if (!ADMIN_LEVEL) {
		ADMIN_LEVEL = 1;
	}
	Complaints.findAll({
		where: {
			level: ADMIN_LEVEL
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

exports.filtered = (req, res) => {
	// data = {
	// 	filters: {

	// 	},
	// 	sort: {
	// 		name: "",
	// 		order: ""
	// 	}
	// }

	if (!checkAdminLogin(req)) {
		res.status(401).send(res_json);
		return;
	}
	ADMIN_LEVEL = req.session.ADMIN_LEVEL;
	if (!ADMIN_LEVEL) {
		ADMIN_LEVEL = 1;
	}
	const valid_keys = ["complaint_id", "roll_number", "hostel_number", "room_number", "issue_type", "name", "status", "level"];
	const data = req.body;

	var condition = "";
	condition["level"] = ADMIN_LEVEL;
	
	for (key in data.filters) {
		if (valid_keys.includes(key)) {
			condition[key] = { [Op.iLike]: `%${data[key]}%` }
		}
	}
	if (!valid_keys.includes(data.sort.name)) {
		data.sort.name = "roll_number";
	}
	if (!["ASC", "DESC"].includes(data.sort.order)) {
		data.sort.order = "ASC";
	}
	//  = params ? { [key]: { [Op.iLike]: `%${params}%` } } : null;
	Complaints.findAll({
		where: condition,
		order: [
			[data.sort.name, data.sort.order]
		]
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

exports.getAction = (req, res) => {
	if (!checkAdminLogin(req)) {
		res.status(401).send(res_json);
		return;
	}
	ADMIN_LEVEL = req.session.ADMIN_LEVEL;
	ADMIN_NAME = req.session.name;
	if (!ADMIN_LEVEL) {
		res.status(401).send(res_json);
	}

	const COMPLAINT_ID = req.query.complaint_id;
	const COMPLAINT_STATUS = req.query.complaint_status;

	if (!["ACCEPT", "REJECT", "ESCALATE"].includes(COMPLAINT_STATUS)) {
		res.status(400).send({
			message: "Invalid Status"
		})
	}
	if (COMPLAINT_STATUS == "ESCALATE" && ADMIN_LEVEL != 3) {

		Complaints.update({
			"level": ADMIN_LEVEL + 1,
			"handler_name": ADMIN_NAME
		}, {
			where: {
				complaint_id: COMPLAINT_ID
			}
		}).then(data => {
			if(!data){
				res.status(400).send({
					message: "Failed to Update!"
				})
			}
		})
	} else {
		Complaints.update({
			"status": COMPLAINT_STATUS
		}, {
			where: {
				complaint_id: COMPLAINT_ID
			}
		}).then(data => {
			if(!data){
				res.status(400).send({
					message: "Failed to Update!"
				})
			}
		})
	}
}