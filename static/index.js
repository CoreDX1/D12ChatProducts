const socket = io()

socket.on('mensage_back', (data) => {
  console.log(data)
  render(data)
})

socket.on('mensage_Msn', (dataMsn) => {
  console.log(dataMsn)
  renderMsn(dataMsn)
})

const render = (data) => {
  const html = data.length > 0 ? data.map((pr) => {
    return `
      <tr>
        <th class="tr">${pr.name}</th>
        <td class="tr">${pr.price}</td>
        <td class="tr"><img class="imagen" src="${pr.image}"></td>
      </tr>
    `
  }).join(' ') : `
      <tr>
        <th scope="row"></th>
        <td>No hay productos</td>
        <td></td>
      </tr>
  `
  document.querySelector('#productsList').innerHTML = html
}

const addInfo = () => {
  let dataObj = {
    "name": document.querySelector('#nm').value,
    "price": document.querySelector('#pr').value,
    "image": document.querySelector('#im').value,
  }
  console.log(dataObj)
  socket.emit('dataMsn', dataObj)
  return false
}

// Mensajes
const renderMsn = (dataMsn) => {
  let html = dataMsn.map(x => {
    return `
      <p> <strong> ${x.name} </strong> : ${x.message}</p>
    `
  }).join(' ')
  document.querySelector('#caja').innerHTML = html
}

const addChat = () => {
  let dataChat = {
    "name": document.querySelector('#nb').value,
    "message" : document.querySelector('#msn').value
  }
  console.log(dataChat)
  socket.emit('message_chat', dataChat)
  document.querySelector('#msn').value = ""
  return false
}

