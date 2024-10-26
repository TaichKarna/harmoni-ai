const express = require('express')
const { createServer } = require("node:http")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const path = require('path')
//routers
const { authRouter } = require('./routers/auth.router')
const { userRouter } = require('./routers/user.router')

const app = express();
const server = createServer(app);
app.use(cors());


const __location = path.resolve();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())


  

app.use( (req, res, next) => {
  const currentTime = new Date().toISOString();

  console.log(`[${currentTime}] ${req.method} request to ${req.originalUrl}`);
  console.log('Query:', req.query);
  console.log('Body:', req.body);

  next();
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__location,'client','dist','index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

server.listen(3000,() => {
    console.log("listening to this server")
})




