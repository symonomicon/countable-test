//controllers.js
const { Time } = require('../db');

// for creating a new product
// Controller for creating a new product
const createTime = async (req, res) => {
    try {
        const { start } = req.body;
        const time = await Time.create({ start });
        res.json({ message: 'Time start record successful', time });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const updateTime = async (req, res) => {
    try {
        const { id, start, end } = req.body;
        const time = await Time.findOneByPk(id);
        if (start) {
            time.start = start
        }
        if (end) {
            time.end = end
        }
        await time.save()
        res.json({ message: 'Time start record successful', time });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// const getTime = async (req, res) => {
//     try {
//         const email = req.params.email;
//         const user = await User.findOne({ where: { email: email } })
//         if (!user) {
//             res.status(404).send('User not found')
//         }
//         res.json(user)
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// };

module.exports = {
    createTime,
    updateTime
}