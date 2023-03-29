const information = document.getElementById('info')

information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
  const response = await window.versions.ping()

  console.log(response) // prints out 'pong'
}

func()

const updateOnlineStatus = () => {
  document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')

const setTitle = () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
}

setButton.addEventListener('click', setTitle)

const btnfile = document.getElementById('btnfile')
const filePathElement = document.getElementById('filePath')

const openFile = async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
}

btnfile.addEventListener('click', openFile)

const counter = document.getElementById('counter')

const updateCounter = (_event, value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue
  
  _event.sender.send('counter-value', newValue)
}

window.electronAPI.onUpdateCounter(updateCounter)