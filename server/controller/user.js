import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import bcrypt from 'bcrypt';

//UPDATE USER
export const userUpdate = async (req, res) => {
  if (req.body.userId == req.params.id) {
    console.log();
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'server error' });
    }
  } else {
    res.status(401).json({ message: 'you can only update your account' });
  }
};

//DELETE USER
export const userDelete = async (req, res) => {
    if (req.body.userId == req.params.id) {
       try {
        const user=await User.findById(req.body.userId)
       
        try {
            await Post.deleteMany({username:user.username})
            await User.findByIdAndDelete(req.body.userId)
            res.status(200).json({message:"User has been deleted"})

            
        } catch (error) {
            res.status(500).json({message:"internal error from userDelete"})
        }
        
       } catch (error) {
         res.status(404).json({message:"User not found"})
       }
    
    } else {
      res.status(401).json({ message: 'you can only delete your account' });
    }
  };

//get User
export  const getUser= async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(!user){ return res.status(404).json({message:"User not found"})}
    const {password,...others}=user._doc
   res.status(200).json(others)


}