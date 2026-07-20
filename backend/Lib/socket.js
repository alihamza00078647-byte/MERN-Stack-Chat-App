// // Initialize Socket.io for real time chat
// const io = new Server(server, {
//     cors: {origin : "*"}
// })

// // Store online users
// const userSocketMap = {}  // {userId: socketId}

// // Establish Socket Connection 
// io.on('connection', (socket) => {
//     const userId = socket.handshake.query.userId;
//     console.log("Socket Connected", userId);

//     if (userId) userSocketMap[userId] = socket.id;

//     io.emit('getOnlineUser', Object.keys(userSocketMap));
    
//     socket.on('disconnect', () => {
//         console.log("User disconnected", userId)
//         delete userSocketMap[userId]

//         io.emit('getOnlineUser', Object.keys(userSocketMap));
//     })
// });


const { Server } = require('socket.io');
let io;

// Store online users
const userSocketMap = {}; // {userId: socketId}

function initSocket(server) {
    io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        console.log("Socket Connected", userId);

        if (userId) userSocketMap[userId] = socket.id;

        io.emit('getOnlineUser', Object.keys(userSocketMap));

        socket.on('disconnect', () => {
            console.log("User disconnected", userId);
            delete userSocketMap[userId];

            io.emit('getOnlineUser', Object.keys(userSocketMap));
        });
    });

    return io;
}

function getIO() {
    if (!io) throw new Error("Socket.io not initialized yet!");
    return io;
}

function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

module.exports = { initSocket, getIO, getReceiverSocketId, userSocketMap};