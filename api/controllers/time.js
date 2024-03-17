//controllers.js
const { User, Time } = require('../db');

// for creating a new product
// Controller for creating a new product
const upsertTime = async (req, res, next) => {
    try {
        const { userId, projectId, date, time } = req.body;
        const [record] = await Time.findOrCreate({
            where: {
                date,
                UserId: userId,
                ProjectId: projectId
            },
        })
        record.time = time || 0
        await record.save()
        res.status(201).json(record)
        return next()
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getTime = async (req, res, next) => {
    try {
        const { userId, projectId, date } = req.query
        if (userId || projectId || date) {
            const time = await Time.findAll({
                where: {
                    ...(userId ? { userId } : {}),
                    ...(projectId ? { projectId } : {}),
                    ...(date ? { date } : {})
                },
            })
            res.status(200).json(time)
            return next()
        }
        const time = await Time.findAll()
        if (!time) {
            res.status(404).send('User not found')
        }
        res.status(200).json(time)
        return next()
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    upsertTime,
    getTime
}