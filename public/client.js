
var thread = $('#thread')
socket.on('thread', (data) =>{
    thread.append('<li class = "user-message">' + data + '</li>')

})

$('form').submit(() => {
    var name = $('#name')

    var message = $('#message')

    if(name.val() && message.val())
    {
        socket.emit('messages', name.val()+': '+ message.val())
    }
   
    message.val('')
    return false
})