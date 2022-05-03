const express = require('express')
let arr = require('./public/arr.json')
let mensaje = require('./public/mensajes.json')
const app = express()
const PORT = 8080

app.use( express.static(( __dirname, './static')));
app.set('view engine', 'ejs')
app.set('views', './public')

//Server
const http = require('http')
const server = http.createServer(app)

//source io
const {Server} = require('socket.io')
const io = new Server(server)

//Connection Socket
io.on('connection', (socket) => {
  console.log('Un usuario se conecto')
  socket.emit('mensage_back', arr)
  socket.emit('mensage_Msn', mensaje)
  //Escuchar Evento de Productos
  socket.on('dataMsn', (data) => {
    arr.push(data)
    io.sockets.emit('mensage_back', arr)
  })
  //Escuchar Evento de Chat
  socket.on('message_chat', (data) => {
    mensaje.push(data)
    io.sockets.emit('mensage_Msn', mensaje)
  })
})

//Rutas
app.get('/api', (req, res) =>{
  res.render('index')
})

server.listen(PORT, () => {
  console.log('Server on')
}) 
