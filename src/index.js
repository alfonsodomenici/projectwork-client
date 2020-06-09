import {isTokenValid} from "./jwt.js";
import Menu from './Menu.js';
import WelcomeMessage from './WelcomeMessage.js';

//window.location.href = isTokenValid() ? "posts.html" : "login.html";

customElements.whenDefined('pw-message')
.then(_ => {
    const pwmessage = document.querySelector('pw-message');
    console.dir(pwmessage);
})
    