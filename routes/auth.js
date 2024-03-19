import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username,password} = req.body;
    console.log(req.body)

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
                
            }
        });

        if (!user) {
            return res.status(401).send("Unauthorized: Invalid username");
        }

        if (user.password !== password) {
            return res.status(401).send("Unauthorized: Invalid password");
        }

        const token = jwt.sign({ username }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    } 
    catch (error) {
        console.error("Error occurred during login:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/logout', (req, res) => {
  // Get the token from the request cookies
    const token = req.cookies.token;

    if (!token) {
      // If no token is present, send unauthorized response
        return res.status(401).send("Unauthorized: No token provided");
    }

    try {
      // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

      // Clear the token cookie if verification is successful
        res.clearCookie('token').sendStatus(200);
    } 
    catch (error) {
      // If token verification fails, send unauthorized response
        res.status(401).send("Unauthorized: Invalid token");
    }
});

export default router;
