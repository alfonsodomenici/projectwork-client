export default class WelcomeMessage extends HTMLElement{
    constructor(){
        super();
        console.log('WelcomeMessage constructor... ');
    }

    connectedCallback(){
        this.innerHTML = this.createView();
    }

    createView(){
        return `
            <p>welcome to POSTS APP...</p>
        `;
    }
}

customElements.define('pw-message',WelcomeMessage);