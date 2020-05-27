import UserStore from './UserStore.js';

const onsave = (e) => {
    console.log('onsave');
    e.preventDefault();
    const user = {
        firstName: fnameEl.value,
        lastName: lnameEl.value,
        birthDate: bdateEl.value,
        usr: usrEl.value,
        pwd: pwdEl.value
    }
    store.create(user)
        .then(json => {
            console.log(json);
            window.location.href = 'login.html';
        });
}
const fnameEl = document.getElementById("firstName");
const lnameEl = document.getElementById("lastName");
const bdateEl = document.getElementById("birthDate");
const usrEl = document.getElementById("usr");
const pwdEl = document.getElementById("pwd");
const formEl = document.querySelector('form');
formEl.addEventListener("submit", onsave);
const store = new UserStore();


