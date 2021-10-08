 const io = require('socket.io')(5006, { cors: { origin: '*', } });

const users = {} // define for getting name of diff users with socket id

io.on('connection', socket => { 
    socket.on('new-user-joined', name => { 
        users[socket.id] = name; 
        socket.broadcast.emit('user-joined', name) 
    })


    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] })
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]
    })

})
