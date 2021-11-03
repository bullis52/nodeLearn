module.exports = {
    getUsers: (req, res) => {
        res.json('Get all users');
    },
    getUsersById: (req, res) => {
        const {user_id} = req.params;

        const user = db[user_id];

        res.json(user);
    },
    createUser: (req, res) => {
        res.json('create user');
    },
    updateUser: (req, res) => {
        res.json('update user');
    }
};
