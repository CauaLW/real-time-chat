const express = require('express')
const app = express()
// To use socket.io the server need to be created using http module
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

io.on('connection', (socket) => {
    io.emit('user connected')

    socket.on('chat message', (data) => {
       io.emit('chat message', { msg: data.msg, nickname: data.nickname })
    })

    socket.on('user typing', nickname => {
        io.emit('user typing', nickname)
    })

    socket.on('disconnect', () => {
        io.emit('user disconnected')
    })
})

server.listen(3000, () => {
    console.log('Server running on port 3000')
})