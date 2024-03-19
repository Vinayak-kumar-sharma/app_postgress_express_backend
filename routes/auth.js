import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import express from "express";

const router = Router();
const prisma = new PrismaClient();

// Login route
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try 
  {
    const account = await prisma.user.findFirst({
      where: {
        username,
        password, 
      },
    });

    if (account) {
      req.session.loggedin = true;
      req.session.username = username;
      res.send('Login successful!');
    } 
    else {
      res.status(401).send('Invalid username or password');
    }
  } 
  catch (error) 
  {
    console.error('Error during login:', error.message);
    next(error);
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out successfully!');
});

export default router;
