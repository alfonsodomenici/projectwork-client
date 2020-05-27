import { isTokenValid, decodeToken, readToken } from "./jwt.js";
import PostStore from './PostStore.js';

const loadPost = () => {
    store.find(id)
        .then(json => {
            titleEl.value = json.title;
            bodyEl.value = json.body;
            endDateEl.value = json.endDate;
            postToEdit = json;
            renderDocuments();
        });
}

const renderDocuments = () => {
    const sectionEl = document.querySelector("section");

    const markup = `
        <header>
            <h3>Documenti</h3>
        </header>
        ${postToEdit !== null ? postToEdit.documents.filter(doc => !doc.todelete).map(doc => renderDocument(doc)).join('<hr/>') : ''}
        ${documentsToUpload.map(doc => renderDocument(doc)).join('<hr/>')}
    `;
    sectionEl.innerHTML = markup;
    attachDownload();
    attachDelete();
}

const renderDocument = (doc) => {
    return `
        <div>
            <p>${doc.title}</p>
            <a href="#" data-type="download" data-doc-id="${doc.id}">${doc.file}</a>
            <a href="#" data-type="delete" data-doc-id="${doc.id}">elimina</a>
        </div>
    `;
}

const attachDownload = () => {
    const elements = document.querySelectorAll("[data-type='download']");
    elements.forEach(el => {
        el.addEventListener("click", e => onDocumentDownload(e, parseInt(el.dataset.docId)));
    })
}

const attachDelete = () => {
    const elements = document.querySelectorAll("[data-type='delete']");
    elements.forEach(el => {
        el.addEventListener("click", e => onDocumentDelete(e, parseInt(el.dataset.docId)));
    })
}
const oncreate = (e) => {
    e.preventDefault();
    const post = {
        title: titleEl.value,
        body: bodyEl.value,
        endDate: endDateEl.value
    }
    store.create(post)
        .then(json => {
            console.log(json);
            return store.updateDocuments(json.id, documentsToUpload, [])
        })
        .then(values => {
            console.log(values);
            window.location.href = 'posts.html';
        });
}

const onsave = (e) => {
    e.preventDefault();
    postToEdit.title = titleEl.value;
    postToEdit.body = bodyEl.value;
    postToEdit.endDate = endDateEl.value;
    store.update(postToEdit)
        .then(json => {
            console.log(json);
            const documentsToDelete = postToEdit.documents ? postToEdit.documents.filter(doc => doc.todelete) : [];
            return store.updateDocuments(id, documentsToUpload, documentsToDelete)
        })
        .then(values => {
            console.log(values)
            window.location.href = 'posts.html';
        });
}

const onDocumentDelete = (e, id) => {
    documentsToUpload = documentsToUpload.filter(doc => doc.id !== id);
    if (postToEdit !== null) {
        const doc = postToEdit.documents.find(doc => doc.id === id);
        if (doc) {
            doc.todelete = true;
        }
    }
    renderDocuments();
}

const onDocumentDownload = (e, docId) => {
    e.preventDefault();
    store.document(id, docId, true)
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

const onDocumentAdd = (e) => {
    e.preventDefault();
    const doc = {
        id: Date.now(),
        title: fileEl.files[0].name,
        mediaType: fileEl.files[0].type,
        uploadedFile: fileEl.files[0],
        fileName: fileEl.files[0].name
    }
    documentsToUpload.push(doc);
    renderDocuments();
}

if (!isTokenValid()) {
    window.location.href = "login.html";
}
const { sub } = decodeToken();
const store = new PostStore();
let postToEdit = null;
let documentsToUpload = [];
const titleEl = document.getElementById("title");
const bodyEl = document.getElementById("body");
const endDateEl = document.getElementById("endDate");
const postFormEl = document.querySelector('form#postForm');
const documentFormEl = document.querySelector('form#documentForm');
const fileEl = document.querySelector("#file");

const url = new URL(document.location.href);
const id = url.searchParams.get('id');
postFormEl.addEventListener("submit", id === null ? oncreate : onsave);
documentFormEl.addEventListener("submit", onDocumentAdd);
if (id !== null) {
    loadPost();
}