module.exports.checkLogin = req => {
    user_session = req.session;

    if (!user_session.student_login
        || !user_session.name
        || !user_session.roll_number
        || !user_session.hostel_number
        || !user_session.room_number
    ) {
        return false;
    }
    return true;
}

module.exports.checkAdminLogin = req => {
    user_session = req.session;
    if (!user_session.admin_login
        || !user_session.name
        || !user_session.email
        || !user_session.ADMIN_LEVEL) {
        return false;
    }
    return true;
}

module.exports.getAdminNames = () => {
    return ["Officer 1","Officer 2","Officer 3"]
}