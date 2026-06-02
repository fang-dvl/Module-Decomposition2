const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const usernameInput = document.getElementById("username");

const url = "http://localhost:3000/messages";

function addMessage(msg) {

    const div = document.createElement("div");

    div.classList.add("message");

    div.innerHTML = `
        <strong>${msg.username}</strong>
        (${msg.time})
        <br>
        ${msg.text}
    `;

    chatBox.appendChild(div);
}

sendBtn.addEventListener("click", async() => {

    const text = messageInput.value.trim();

    const username =
        usernameInput.value.trim() || "Anonymous";

    if (!text) return;

    const msg = {

        username,
        text,
        time: new Date().toLocaleTimeString()

    };
    await fetch(url, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(msg)
        }
    )
    addMessage(msg);
    messageInput.value = "";
});

async function loadMessages() {
    try {
        const response=await fetch(url)
        const messages=await response.json();
        chatBox.innerHTML = "";
        messages.forEach(addMessage);
    }
    catch(error) {
        console.error("Failed to load messages",error);
   }
}

loadMessages();

setInterval(loadMessages,5000);