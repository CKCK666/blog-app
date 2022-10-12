import express from 'express';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
//signIn
export const signin = async (req, res) => {
  const { email, password } = req.body;
const n=0
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User is not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: 'incorrect password' });
    }

    res.status(200).json(existingUser);
  } catch (error) {
    res.status(404).json({ message: 'something when wrong!!!' });
  }
};
//signIn
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ message: 'User already exist' });
    }
    if (password != confirmPassword) {
      return res.status(404).json({ message: 'password not match' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashPassword,
      username: `${firstName} ${lastName}`,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ message: 'something when wrong!!!' });
  }
};
