const socket = io('http://localhost:5006');

const drop = document.querySelector('.frm'); //form tag
const dropMessage = document.querySelector('.message') //input tag
const container = document.querySelector('.blank') //message container

const append = (e, message) => {
    const txtDiv = document.createElement('div') 
    txtDiv.classList.add('txt', 'arrow-left') // a div element with class txt and arrow-left
    const messageElementOne = document.createElement('p');
    const messageElement = document.createElement('p');
    messageElementOne.innerHTML = e
    messageElement.innerText = message;
    messageElementOne.classList.add('me')
    messageElement.classList.add('md')
    txtDiv.append(messageElementOne)
    txtDiv.append(messageElement)
    container.append(txtDiv)
}


const appendone = (e, message) => {
    const txtDiv = document.createElement('div')
    txtDiv.classList.add('txtr', 'arrow-right')
    const messageElementOne = document.createElement('p');
    const messageElement = document.createElement('p');
    messageElementOne.innerHTML = e
    messageElement.innerText = message;
    messageElementOne.classList.add('mer')
    messageElement.classList.add('mdr')
    txtDiv.append(messageElementOne)
    txtDiv.append(messageElement)
    container.append(txtDiv)
}

const name = prompt('Enter your name to get in:', 'Unknown');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    appendone('Server', `${name} joined the party!`)
})


socket.on('recieve', data => {
    appendone(`${data.name}`, `${data.message}`)
})

socket.on('left', name => {
    appendone(`${name}`, 'flyied away...')
})

drop.addEventListener('submit', (e) => {
    e.preventDefault();
    const mass = dropMessage.value
    append('You', `${mass}`)
    socket.emit('send', mass);
    dropMessage.value = ''
})
