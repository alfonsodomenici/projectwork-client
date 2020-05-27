import {writeToken} from "./jwt.js";

const onlogin = (e) => {
    e.preventDefault();
    const credential = {
        usr: usrEl.value,
        pwd: pwdEl.value
    }
    fetch("http://localhost:8080/projectwork/resources/authentication", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(credential)
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).then(data => {
        const { token } = data;
        writeToken(token);
        window.location.href = 'posts.html';
    }).catch(error => {
        console.log("si è vetificato un problema durante l'operazione fetch:", error);
    });
}

const usrEl = document.getElementById("usr");
const pwdEl = document.getElementById("pwd");
const formEl = document.querySelector('form');

formEl.addEventListener("submit", onlogin);

