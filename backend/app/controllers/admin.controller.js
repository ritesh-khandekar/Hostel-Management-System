const db = require("../models");
const { checkAdminLogin } = require("../methods/methods");
const session = require("express-session");
const moment = require("moment")
const Admins = db.admins;
const Complaints = db.complaint;
const Op = db.Sequelize.Op;

var res_json = {
	"login": false
}

exports.status = (req, res) => {
	for (key in req.session) {
		res_json[key] = req.session[key]
	}
	if (checkAdminLogin(req)) {
		res_json["login"] = true;
		res_json["ADMIN_LEVEL"] = req.session.ADMIN_LEVEL;
	}
	Admins.findOne({
		where: {
			level: res_json["ADMIN_LEVEL"]
		}
	}).then(data => {
		if (data.level == "1") {
			Complaints.count({
				where: {
					[Op.not]: { "status": null },

					[Op.or]: [
						{ "level": "2" },
						{ "level": "3" }
					]
				}
			}).then(data => {
				res_json["solved"] = data.toString();
				res.status(201).send(res_json);
			}).catch(err => {
				res.status(500).send(err);
			})
		} else if (data.level == "2") {
			Complaints.count({
				where: {
					[Op.not]: { "status": null },

					[Op.or]: [
						{ "level": "3" }
					]
				}
			}).then(data => {
				res_json["solved"] = data.toString();
				res.status(201).send(res_json);
			}).catch(err => {
				res.status(500).send(err);
			})
		} else {
			Complaints.count({
				where: {
					[Op.not]: [{ "status": null }],
					"level": "3"
				}
			}).then(data => {
				res_json["solved"] = data.toString();
				res.status(201).send(res_json);
			}).catch(err => {
				res.status(500).send(err);
			})
		}

	}).catch(err => {
		res.status(500).send(err)
	})

}
// exports.create = (req, res) => {
// 	Admins.create({
// 		email: req.body.email,
// 		password: req.body.password,
// 		level: req.body.level,
// 		name: req.body.name
// 	}).then(data => {
// 		res.status(201).send(data)
// 	}).catch(err => {
// 		res.status(500).send(err)
// 	})
// }
// exports.adminStatus = (req, res) => {
// 	if (!req.body.email || !req.body.password) {
// 		res.status(400).send({
// 			message: "Please Enter Email ID and Password"
// 		})
// 	}
// 	Admins.findOne({
// 		where: {
// 			email: req.session.ADMIN_LEVEL
// 		}
// 	}).then(data => {
// 		res.send()
// 	})
// }

exports.login = (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).send({
			message: "Please Enter Email ID and Password"
		})
	}
	Admins.findOne({
		where: {
			email: req.body.email,
			password: req.body.password
		}
	})
		.then(data => {
			if (data) {
				var user_session = req.session;
				user_session.admin_login = true;
				user_session.name = data.name;
				user_session.email = data.email;
				user_session.ADMIN_LEVEL = data.level;
				data = {}
				data["success"] = true;
				res.send(data);
			} else {
				res.status(400).send({
					message: `Wrong Email or Password!`
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
	ADMIN_LEVEL = req.session.ADMIN_LEVEL.toString();
	if (!ADMIN_LEVEL) {
		ADMIN_LEVEL = "1";
	}
	if (ADMIN_LEVEL < 3) {
		var NEW_LEVEL = (parseInt(ADMIN_LEVEL) + 1).toString();
		Admins.findOne({
			where: {
				level: NEW_LEVEL
			}
		}).then(data => {
			Complaints.update({
				"level": NEW_LEVEL,
				"handler_name": data.name,
				"status": ""
			}, {
				where: {
					createdAt: {
						[Op.lte]: moment().subtract(7, 'days').toDate()
					}
				}
			}).then(data => {
			}).catch(err => {
				res.status(500).send({
					message: err
				})
			})
		}).catch(err => {
			res.status(500).send({
				message: err
			})
		})
	}
	Complaints.findAll({
		limit: 30,
		where: {
			level: ADMIN_LEVEL,
			// status: null,
		},
		order: [
			["status", "ASC"],
		]
	})
		.then(data => {
			if (data) {
				res.status(201).send(data);
			}
			else {
				res.status(500).send({
					message:
						err.message || "Some error occurred while retrieving complaints."
				});
			}
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
	// 	sorts: {
	// 		name: "",
	// 		order: ""
	// 	}
	// }

	if (!checkAdminLogin(req)) {
		res.status(401).send(res_json);
		return;
	}
	ADMIN_LEVEL = req.session.ADMIN_LEVEL.toString();
	if (!ADMIN_LEVEL) {
		ADMIN_LEVEL = "1";
	}
	const valid_keys = ["complaint_id", "roll_number", "hostel_number", "room_number", "issue_type", "name", "status", "level", "createdAt"];
	const data = req.body;
	if (req.body == null || req.body == "") {
		res.status(400).send({
			message: "Empty Content"
		});
		return;
	}
	var condition = {};
	condition["level"] = ADMIN_LEVEL;

	for (key in data.filters) {
		if (valid_keys.includes(key)) {
			if (data.filters[key] == "" || data.filters[key] == null) {
				continue;
			}
			condition[key] = { [Op.like]: `%${data.filters[key]}%` }
		}
	}
	// console.log(condition)
	console.log(data)
	if (!valid_keys.includes(data.sorts.name)) {
		data.sorts.name = "roll_number";
	}
	if (!["ASC", "DESC"].includes(data.sorts.order)) {
		data.sorts.order = "ASC";
	}
	//  = params ? { [key]: { [Op.iLike]: `%${params}%` } } : null;
	Complaints.findAll({
		limit: 30,
		where: condition,
		order: [
			// ["status","ASC"],
			[data.sorts.name, data.sorts.order]
		]
	})
		.then(data => {
			res.status(201).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err || "Some error occurred while retrieving complaints."
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

	// console.log(req.query)
	const COMPLAINT_ID = req.body.complaint_id;
	const COMPLAINT_STATUS = req.body.complaint_status;

	if (!["ACCEPT", "REJECT", "ESCALATE"].includes(COMPLAINT_STATUS)) {
		res.status(400).send({
			message: "Invalid Status"
		})
	}
	if (COMPLAINT_STATUS == "ESCALATE" && ADMIN_LEVEL != "3") {
		var NEW_LEVEL = (parseInt(ADMIN_LEVEL) + 1).toString();
		Admins.findOne({
			where: {
				level: NEW_LEVEL
			}
		}).then(data => {
			Complaints.update({
				"level": NEW_LEVEL,
				"handler_name": data.name,
				"status": ""
			}, {
				where: {
					id: COMPLAINT_ID
				}
			}).then(data => {
				if (!data) {
					res.status(400).send({
						message: "Failed to Update!"
					})
				} else {
					res.status(201).send({
						"success": true
					})
				}
			}).catch(err => {
				res.status(500).send({
					message: err
				})
			})
		}).catch(err => {
			res.status(500).send({
				message: err
			})
		})

	} else {

		Complaints.update({
			"status": COMPLAINT_STATUS
		}, {
			where: {
				id: COMPLAINT_ID
			}
		}).then(data => {
			if (!data) {
				res.status(400).send({
					message: "Failed to Update!"
				})
			} else {
				res.status(201).send({
					"success": true
				})
			}
		}).catch(err => {
			res.status(500).send({
				message: err
			})
		});
	}
}