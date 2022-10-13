import express from 'express';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
//signIn
export const signin = async (req, res) => {
  const { username, password } = req.body;
const n=0
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.json({ message: 'User is not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.json({ message: 'Incorrect password' });
    }

    res.status(200).json(existingUser);
  } catch (error) {
    res.status(404).json({ message: 'something when wrong!!!' });
  }
};
//signIn
export const signup = async (req, res) => {

  const { userName, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
   
    if (existingUser) {
      
     return res.json({message:"User already exist!!!"}).status(403)
    }
  
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("am here")
    const newUser = await User.create({
      email,
      password: hashPassword,
      username: userName,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ message: 'something when wrong!!!' });
  }
};
