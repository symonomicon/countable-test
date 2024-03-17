//controllers.js
const { User } = require('../db');

// for creating a new product
// Controller for creating a new product
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, password, email } = req.body;
        const user = await User.create({ firstName, lastName, password, email });
        res.json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getUser = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            res.status(404).send('User not found')
        }
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    createUser,
    getUser
}