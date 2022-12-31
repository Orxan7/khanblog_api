const Post = require("../database/models/post.model");
const jwt = require("jsonwebtoken");
const User = require("../database/models/user.model");


const getAllPosts = async(req, res) =>{
    try{
        const posts = await Post.findAll({
            include: User
        });
        let array = [];
        posts.map((item)=>{
            array.push({
                username: item.User.username,
                text: item.text,
                created: item.createdAt,
                post_id: item.id,
                user_id: item.User.id,
            })
        })
        res.json(array);
    }
    catch(err){
        console.log(err)
    }
    
}

const getUserById = async(req, res)=>{
    try{
        const posts = await Post.findAll({
            where:{
                user_id: req.params.id
            },
            include: User
        });

        const username = (await User.findOne({
            where: {
                id: req.params.id
            }
        })).username
        
        let array = [];

        posts.map((item)=>{
            array.push({
                username: item.User.username,
                text: item.text,
                created: item.createdAt,
                post_id: item.id,
                user_id: item.User.id,
            })
        })
        res.json({array, username: username});
    }
    catch(err){
        res.status(400).json({error: "This user doesn't exist."})
    }

}

const createPost = async(req,res)=>{

    try{
        const decodedToken = await jwt.verify(req.cookies.TOKEN, process.env.secretKey);
        const {text} = req.body;
    
        const data = {
            user_id: decodedToken.id,
            text: text,
        };
        
        const username = (await User.findOne({
            where: {
                id: decodedToken.id
            }
        })).username
    
        if(text.length<3 || !text){
            res.status(400).json({message: 'Post must contain at least 3 characters.'})
        }
        else{
            Post.create(data)
            .then((data)=>{
                res.status(200).json({
                    username: username,
                    text: data.text,
                    created: data.createdAt,
                    post_id: data.id,
                    user_id: decodedToken.id,
                    status: "Success"
                })
            })
            .catch(err=>{
                res.json({message: err})
            });
        }
    }
    catch (error) {
        res.status(400).json({
          error: new Error("Invalid request!"),
    });
    }

}

const deletePost = async(req,res)=>{
    
    try{
        const decodedToken = await jwt.verify(req.cookies.TOKEN, process.env.secretKey);

        const post = await Post.findOne({
            where: {
                id: req.body.post_id
            },
            include: User
        })

        if(decodedToken.id===post.User.id){
            post.destroy().
                then(()=>{
                    res.json({message: "Success"})
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        else{
            res.status(400).json({error: "You can't delete other people's posts."})
        }
    }
    catch (error) {
        res.status(400).json({
          error: new Error("Invalid request!"),
    });
    } 
}
module.exports = {
    getAllPosts,
    getUserById,
    createPost,
    deletePost
};