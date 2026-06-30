async function sendMessage(){

    const input=document.getElementById("message");

    const chatBox=document.getElementById("chatBox");

    const message=input.value;

    if(message==="") return;

    chatBox.innerHTML+=`
        <div class="user">
            <div class="message">${message}</div>
        </div>
    `;

    input.value="";

    const response=await fetch("http://localhost:5000/api/chat",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            message:message

        })

    });

    const data=await response.json();

    chatBox.innerHTML+=`
        <div class="bot">
            <div class="message">${data.response}</div>
        </div>
    `;

    chatBox.scrollTop=chatBox.scrollHeight;

}