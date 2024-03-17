//controllers.js
const { User } = require('../db');

// for creating a new product
// Controller for creating a new product
const createUser = async (req, res, next) => {
    try {
        console.log(req.body)
        const { firstName, lastName, password, email } = req.body;
        const user = await User.create({ firstName, lastName, password, email });
        res.status(200).json({ message: 'User created successfully', user });
        return next()
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        return next()
    }
};

const getUser = async (req, res, next) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ where: { email } })
        if (!user) {
            res.status(404).send('User not found')
            return next()
        }
        res.status(200).json(user)
        return next()
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        return next()
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email, password } })
        if (!user) {
            res.status(403).send('Login unsuccessful.')
            return next()
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
        return next()
    }
}
module.exports = {
    createUser,
    getUser,
    login
}