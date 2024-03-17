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
    allowNull: true,
  },
  end: {
    type: DataTypes.STRING,
    allowNull: true,
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
Project.hasMany(Time)

// Time
Time.belongsTo(User)
Time.belongsTo(Project)

/** Init Data */
Project.sync().then(() => {
  const projectData = [
    { name: 'Igni' },
    { name: 'Aard' },
    { name: 'Quen' },
    { name: 'Yrden' },
    { name: 'Axii' },
  ];

  Project.bulkCreate(projectData)
    .then(() => {
      console.log('Projects inserted successfully');
    })
    .catch(err => {
      console.error('Error inserting projects:', err);
    });
})

module.exports = {
  sequelize,
  User,
  Time,
  Project
}