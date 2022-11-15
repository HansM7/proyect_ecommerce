const socket = io.connect()

socket.on('prueba', (data) => {
    console.log(data)
})

// socket.on('allMessagesServer', (messages) => {
//     renderMessages(messages)
// })

// const sendMessage=()=>{
//     const val_text=document.getElementById('val_text').value
//     axios.post('/chat',val_text)
//     .then((result) => {
//         console.log(result);
//         socket.emit('addMessage',"Se registro un mensaje")
//     })
// }

// const renderMessage=()=>{

    
// }