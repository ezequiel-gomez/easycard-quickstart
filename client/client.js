var socket = io();

socket.on('connect', function () {
  socket.emit('newplayer', newPlayer());
});

function newPlayer () {
  var playerName = prompt("Cuál es tu nombre?");
  if (playerName !== null) {
    return {name: playerName};
  }
}

socket.on('updatechat', onMessage);
socket.on('enablechatinput', enableChatInput);
socket.on('enablebettinginput', enableBettingInput);

function enableChatInput () {
  var form = document.createElement('form'),
      input = document.createElement('INPUT'),
      button = document.createElement('BUTTON'),
      container = document.getElementsByClassName('input_controls')[0];

  input.setAttribute('autocomplete', 'off');
  input.id = 'chat-input';
  button.className = 'enviar';
  button.innerHTML = 'Enviar';

  form.appendChild(input);
  form.appendChild(button);

  container.appendChild(form);

  form.addEventListener('submit', function(e) {
    var input = document.getElementById('chat-input');
    var message = input.value;
    if (message.trim() != '') {
      input.value = '';
      socket.emit('sendchat', message);
    }
    e.preventDefault();
  });
}

function enableBettingInput () {
  var form = document.createElement('form'),
      input = document.createElement('INPUT'),
      button = document.createElement('BUTTON'),
      container = document.getElementsByClassName('input_controls')[0];

  input.setAttribute('autocomplete', 'off');
  input.setAttribute('placeholder', 'Monto');
  input.setAttribute('type', 'number');
  input.setAttribute('maxlength', '7');
  input.id = 'betting-input';
  button.className = 'enviar';
  button.innerHTML = 'Apostar';

  form.appendChild(input);
  form.appendChild(button);

  container.appendChild(form);

  form.addEventListener('submit', function(e) {
    var input = document.getElementById('betting-input');
    var message = input.value;
    if (message.trim() != '') {
      input.value = '';
      socket.emit('sendbet', message);
    }
    e.preventDefault();
  });
}

function onMessage (username, data) {
  var list = document.getElementById('chat-text');
  var el = document.createElement('li');

  el.innerHTML = '<b>' + username + '</b> ' + data;
  list.appendChild(el);
  list.scrollTop = list.scrollHeight;
}
