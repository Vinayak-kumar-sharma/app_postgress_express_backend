import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(cors())
// Use routes
app.use('/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
