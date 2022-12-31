const Sequelize = require("sequelize");
const dotEnv = require('dotenv');

dotEnv.config();

const connection = new Sequelize(
    process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: false,
            define: {
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        });

(async ()=>{
    try{
        await connection
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                const User = require('./models/user.model');
                const Post = require('./models/post.model');
                console.log('Models are created');
            })
            .catch(error => {
                throw error;
            });
    }catch(error){
        throw error;
    }
})()




module.exports = {
    connection: connection,
}