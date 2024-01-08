
const Sequelize = require('sequelize');

const db = require('@models/database.js');


const users = db.define('users', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
})


module.exports = users;