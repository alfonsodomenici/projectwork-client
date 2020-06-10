import { decodeToken, isTokenValid, readToken } from './jwt.js';
import PostStore from './PostStore.js';
import Menu from './Menu.js';
import {html, render} from './lib/lit-html.js';

const loadPosts = (url) => {
    store.all()
        .then(json => {
            renderPosts(json);
        });
}

const onDocumentDownload = (e, docId, postId) => {
    e.preventDefault();
    store.document(postId,docId)
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "documento";
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
}

const onDeletePost = (e, id) => {
    e.preventDefault();
    store.delete(id)
    .then(resp => {
        console.log(resp.statusText);
        loadPosts();
    });
    
}

const renderPosts = (data) => {
    const sectionEl = document.querySelector('article');
    const template = html`
        <hr/>
        ${data.map(post => renderPost(post))}
    `;
    render(template,sectionEl);
}

const renderPost = (post) => {
    console.log(post.documents.length);
    return html`
        <div>
            <h3>${post.title}</h3>
            <p>${post.body}</p> 
            <h4>Documenti</h4>
            <ul>
                 ${post.documents && post.documents.length > 0 ? 
                    post.documents.map(doc => renderDocument(doc, post.id))
                    : html`<p>Nessun documento presente</p>`}
            </ul>
            <a href="postCrud.html?id=${post.id}">modifica</a>
            <a href="#" @click=${e => onDeletePost(e,post.id)}>elimina</a>
        </div>
        <hr/>
    `;
}

const renderDocument = (doc, postId) => {
    return html`
        <li>
            <p>${doc.title}</p>
            <a href="#" @click=${e => onDocumentDownload(e,doc.id,postId)}>${doc.file}</a>
        </li>
    `;
}

if (!isTokenValid()) {
    window.location.href = "login.html";
}
const { sub } = decodeToken();
const store = new PostStore();
loadPosts(); 