import Post from '../models/postModel.js';



//CREATE POST
export const createPost=async (req, res) => {
  console.log(req.body)
    const newPost = await new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  //GET POST
  export const getPost=async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  };

//updatePost
export const updatePost=async(req,res)=>{
    try {
        const post =await Post.findById(req.params.id)
        if(post.username==req.body.username){
            try {
                const newPost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true})
                res.status(200).json(newPost)
            } catch (error) {
                res.status(500).json({message:"internal error at updatePost"})
            }
            
        }
        else{
            res.status(404).json({message:"You cant update other post"})
        }
    } catch (error) {
        res.status(404).json({message:"Post not found"})
    }

}

//delete post
export const deletePost=async(req,res)=>{
  console.log("in delete ")
    try {
        const post =await Post.findById(req.params.id)
        
        if(post.username==req.body.username){
            try {
                await post.delete()
                
                res.status(200).json({message:"Post deleted!!"})
            } catch (error) {
                res.status(500).json({message:"internal error at deletePost"})
            }
            
        }
        else{
            res.status(404).json({message:"You cant delete other post"})
        }
    } catch (error) {
        res.status(404).json({message:"Post not found"})
    }

}

//GET ALL POSTS
export const getAllPosts=  async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          category: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
 