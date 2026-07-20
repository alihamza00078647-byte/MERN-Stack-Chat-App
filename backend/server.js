// External
require('dotenv').config();
const {Server} = require('socket.io');
const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');

// Local
const { userRouter } = require('./Router/userRouter');
const { messageRouter } = require('./Router/messageRouter');

// Internal
const http = require('http');
const { initSocket } = require('./Lib/socket');
const server = http.createServer(app);



// Middleware
app.use(express.json({limit: "4mb"}));
app.use(cors());

// initialize socket.io
initSocket(server);



app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);



const port = process.env.PORT;
mongoose.connect(process.env.MONGO_URL).then(() => {
    server.listen(port, () => {
        console.log(`Server Running at http://localhost:${port}`);
    })
}).catch((err) => {
    console.log(`DB is Not Connected`, err);
});