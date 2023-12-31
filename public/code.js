(function(){
    const app = document.querySelector(".app");
    const socket = io();

    let uname;
    app.querySelector(".join-screen #join-user").addEventListener("click", function(){
        let username = app.querySelector(".join-screen #username").value;
        if(username.length == 0){
            return;
        }
        socket.emit("newuser", username);
        uname = username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    });
    app.querySelector(".chat-screen #send-message").addEventListener("click", function(){
        let message = app.querySelector(".chat-screen #message-input").value;
        if(message.length == 0){
            return;
        }
        renderMessage("my", {
            username:uname,
            text:message
        });
        socket.emit("chat", {
            username:uname,
            text:message
        });
        app.querySelector(".chat-screen #message-input").value = ""; 
    });

    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function(){
        socket.emit("exituser", uname);
        window.location.href = window.location.href;
    });

    socket.on("update", function(update){
        renderMessage("update", update);
    });
    socket.on("chat", function(message){
        renderMessage("other", message);
    });

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        if(type == "my"){
            let ele = document.createElement("div");
            ele.setAttribute("class", "message my-message");
            ele.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(ele);
        }else if(type == "other"){
            let ele = document.createElement("div");
            ele.setAttribute("class", "message other-message");
            ele.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(ele);
        }else if(type == "update"){
            let ele = document.createElement("div");
            ele.setAttribute("class", "update");
            ele.innerText = message;
            messageContainer.appendChild(ele);
        }
        // scoll chat to end 
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
})();