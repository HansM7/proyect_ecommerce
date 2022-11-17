const socket = io.connect()

socket.on('captureMessages', (data) => {
    console.log(data)
    renderMessages(data)
})

const sendMessage=()=>{
    const message=document.getElementById('val_text').value
    axios.post('/chat',{message})
    .then((result) => {
        console.log(result);
        socket.emit('addMessage',"Se registro un mensaje")
    })
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