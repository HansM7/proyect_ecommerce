const socket = io.connect()

socket.on('applyMessage', (data) => {
    console.log(data)
    getMessages()
})

socket.on('resMessage', (data) => {
    renderMessages(data)
})

const getMessages = () =>{
    const idUser = document.getElementById('secret').value
    socket.emit('captureMessage',{idUser})
}

const sendMessage= async()=>{
    const message=document.getElementById('val_text').value
    const idUser = document.getElementById('secret').value
    const data = {message,idUser}

    if (message!=undefined) {
        await axios.post('/chat',data).then((response)=>{
            socket.emit('addMessage',{message,idUser})
            document.getElementById('val_text').value=""
            setTimeout(()=>{
                socket.emit('resAdminInstant',{message,idUser})
            },3000)
        })  
        .catch((error)=>{
            console.log(error)
        })
        
        

        
    }else{
        console.log("errorrrrr")
    }

    
}

const renderMessages=(data)=>{
    const head=`<div style="overflow-y: scroll ; max-height: 500px;">`
    const body= data.map(index=>{
        return `
        <div>
            <div class="mb-2">
                <span class="span_email text-primary font-weight-bold">${index.type_user}</span>
                <p class="p_text">${index.text}</p>
            </div>
            <hr>
                    
                    
        </div>
      
        `
    }).join(' ')

    const end =`
    `

    const newHtml=head+body+end

    document.getElementById("div_content").innerHTML=newHtml
    
}

// document.addEventListener("DOMContentLoaded", ()=> {
    

//     socket.on('captureMessages', (idUser) => {
//         renderMessages(data)
//     })
    
// });