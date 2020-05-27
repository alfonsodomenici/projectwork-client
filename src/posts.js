import { decodeToken, isTokenValid, readToken } from './jwt.js';
import PostStore from './PostStore.js';

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
    const sectionEl = document.querySelector('section');
    const markup = `
        <hr/>
        ${data.map(post => renderPost(post)).join('<hr/>')}
    `;
    sectionEl.innerHTML = markup;
    attachDownload();
    attachDelete();
}

const renderPost = (post) => {
    return `
        <div>
            <h3>${post.title}</h3>
            <p>${post.body}</p> 
            <h4>Documenti</h4>
            <ul>
                ${post.documents.map(doc => renderDocument(doc, post.id)).join('')}
            </ul>
            <a href="postCrud.html?id=${post.id}">modifica</a>
            <a href="#" data-type="delete" data-post-id="${post.id}">elimina</a>
        </div>
    `;
}

const renderDocument = (doc, postId) => {
    return `
        <li>
            <p>${doc.title}</p>
            <a href="#" data-type="download" data-doc-id="${doc.id}" data-post-id="${postId}">${doc.file}</a>
        </li>
    `;
}

const attachDownload = () => {
    const elements = document.querySelectorAll("[data-type='download']");
    elements.forEach(el => {
        el.addEventListener("click", e => onDocumentDownload(e, el.dataset.docId, el.dataset.postId));
    })
}

const attachDelete = () => {
    const elements = document.querySelectorAll("[data-type='delete']");
    elements.forEach(el => {
        el.addEventListener("click", e => onDeletePost(e, el.dataset.postId));
    })
}


if (!isTokenValid()) {
    window.location.href = "login.html";
}
const { sub } = decodeToken();
const store = new PostStore();
loadPosts(); 