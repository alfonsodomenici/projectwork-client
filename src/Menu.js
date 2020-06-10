import {isTokenValid, removeToken} from './jwt.js';
import {html,render} from './lib/lit-html.js';

export default class Menu extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        render(this.createView(),this);
    }

    onLogout(e){
        e.preventDefault();
        removeToken();
        document.location.href = 'index.html';
    }

    createView(){
        return html`
                <ul>
                    ${isTokenValid() ? this.renderPrivateMenu() : this.renderPublicMenu()}
                </ul>
        `;
    }

    renderPrivateMenu(){
        return html`
            <li><a href = "index.html">home</a></li>
            <li><a href = "posts.html">posts</a></li>
            <li><a href = "postCrud.html">nuovo</a></li>
            <li><a @click=${e => this.onLogout(e)} href = "#" >logout</a></li>
        `;
    }

    renderPublicMenu(){
        return html`
            <li><a href = "index.html">home</a></li>
            <li><a href = "login.html">login</a></li>
            <li><a href = "registration.html">registrati</a></li>
        `;
    }
}

customElements.define('pw-menu', Menu);