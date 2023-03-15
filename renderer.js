const information = document.getElementById('info');

information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();

  console.log(response); // prints out 'pong'
}

func();

const updateOnlineStatus = () => {
  document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline';
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

updateOnlineStatus();