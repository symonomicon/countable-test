const { Project } = require('../db');

const getProject = async (req, res) => {
    try {
        const projectName = req.params.projectName;
        const projects = await Project.findAll({
            ...projectName ? {
                where: { name: projectName }
            } : {}
        })
        if (!projects) {
            res.status(404).send('User not found')
        }
        res.status(200).json(projects)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getProject,
}