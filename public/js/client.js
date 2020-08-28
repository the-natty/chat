// 默认将尝试连接到提供当前页面的主机
var socket = io({
  path: '/ownpath'
});

socket.on('chat msg', function(msg) {
  console.log('receive msg from server: ', msg)
})

var input = document.getElementById('m');
function sendMsg() {
  console.log(input.value)
  socket.emit('chat msg', input.value)
  input.value = ''
  return false
}