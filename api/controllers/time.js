//controllers.js
const { Time } = require('../db');

// for creating a new product
// Controller for creating a new product
const createTime = async (req, res) => {
    try {
        const { start } = req.body;
        const time = await Time.create({ start });
        res.status(200).json({ message: 'Time start record successful', time });
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
        res.status(200).json({ message: 'Time start record successful', time });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getTime = async (req, res) => {
    try {
        // const email = req.params.email;
        const time = await Time.findAll()
        if (!time) {
            res.status(404).send('User not found')
        }
        res.status(200).json(time)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    createTime,
    updateTime,
    getTime
}