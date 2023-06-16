socket = io();

socket.on('new-product', (data) => {

    console.log(data)

    let table = document.querySelector('table tbody')

    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${data.title}</td>
        <td>${data.price}</td>
        <td>${data.thumbnail}</td>
    `
    table.appendChild(tr)
})