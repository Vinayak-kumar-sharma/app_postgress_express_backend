import express from "express";
import session from 'express-session'; 
import Router from './routes/auth.js'; 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.json());


app.use('/auth', Router);
// app.get("/",(req,res)=>{
//   res.send("hello world")
// })

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

// Start your server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
