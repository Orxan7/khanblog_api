const User = require('./models/user.model');
const Post = require("./models/post.model");


User.hasMany(Post, {
    foreignKey: 'user_id'
    });

Post.belongsTo(User);

console.log("Success association!")