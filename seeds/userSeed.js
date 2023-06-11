const {AppUser} = require('../models');

const userData = [
    {
        username: 'Never gonna run around and desert you',
        email: 'not@real.com',
        password: 'password123'
    },
    {
        username: 'Never gonna tell a lie and hurt you',
        email: 'kinda@real.com',
        password: 'password123'
    }
];

const seedUsers = () => AppUser.bulkCreate(userData);
module.exports = seedUsers;