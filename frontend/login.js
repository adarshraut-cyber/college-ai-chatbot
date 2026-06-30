const API = "http://localhost:5000/api/auth/login";

async function login(){

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const response = await fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email,
            password

        })

    });

    const data = await response.json();

    if(response.ok){

        localStorage.setItem("token",data.token);

        window.location.href="admin.html";

    }
    else{

        document.getElementById("message").innerHTML=data.message;

    }

}