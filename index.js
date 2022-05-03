const express = require('express')
let arr = require('./public/arr.json')
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
})

//Rutas
app.get('/api', (req, res) =>{
  res.render('index')
})

server.listen(PORT, () => {
  console.log('Server on')
}) 
