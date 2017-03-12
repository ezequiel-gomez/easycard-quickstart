var socket = io();

socket.on('updatechat', onMessage);

function onMessage (username, data) {
  var list = document.getElementById('chat-text');
  var el = document.createElement('li');

  el.innerHTML = '<b>' + username + '</b> ' + data;
  list.appendChild(el);
  list.scrollTop = list.scrollHeight;
}
