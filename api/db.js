const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory')

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


const Time = sequelize.define('Time', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  start: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

const Project = sequelize.define('Project', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

/** Relations */

// User
User.hasMany(Time)

// Project
Project.hasMany(time)

// Time
Time.belongsTo(User)
Time.belongsTo(Project)

/** Init Data */

const projectData = [
  { name: 'Project 1' },
  { name: 'Project 2' },
  { name: 'Project 3' },
  // Add more projects as needed
];

// Create and save instances of the Project model
Project.bulkCreate(projectData)
  .then(() => {
    console.log('Projects inserted successfully');
  })
  .catch(err => {
    console.error('Error inserting projects:', err);
  });

module.exports = {
  sequelize,
  User,
  Time,
  Project
}