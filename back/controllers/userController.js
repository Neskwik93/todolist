class UsersController {
    static async getUserById(req, res) {
        res.status(200).json({response: {user: {name: 'Eric'}}});
    };
}

module.exports = UsersController;