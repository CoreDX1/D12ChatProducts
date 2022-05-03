const socket = io()

socket.on('mensage_back', (data) => {
  console.log(data)
  render(data)
})

const render = (data) => {
  const html = data.length > 0 ? data.map((pr) => {
    return `
      <tr>
        <th scope="row">${pr.name}</th>
        <td>${pr.price}</td>
        <td><img style="width:100px;height:100px" src="${pr.image}"></td>
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
