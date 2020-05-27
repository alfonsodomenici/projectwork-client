import Rest from "./Rest.js";
import { decodeToken } from './jwt.js';

export default class PostStore extends Rest {

    constructor() {
        super();
        const { sub } = decodeToken();
        this._url = `${this._baseUrl}/users/${sub}/posts`;
    }

    async create(post) {
        return await this._postJsonData(this._url, post, true);
    }

    async find(id) {
        return await this._getJsonData(`${this._url}/${id}`, true);
    }

    async update(post) {
        return await this._putJsonData(`${this._url}/${post.id}`, post, true)
    }

    async all() {
        return await this._getJsonData(this._url, true);
    }

    async delete(id) {
        return await this._deleteJsonData(`${this._url}/${id}`, true);
    }

    async document(id, docId) {
        return await this._getBlobData(`${this._url}/${id}/documents/${docId}/download`, true)
    }

    async uploadDocument(id, { mediaType, fileName, uploadedFile }) {
        const formData = new FormData();
        formData.append('mediaType', mediaType);
        formData.append('fileName', fileName);
        formData.append('uploadedFile', uploadedFile);
        return await this._postFormData(`${this._url}/${id}/documents/upload`, formData, true);
    }

    async deleteDocument(id, docId) {
        return await this._deleteJsonData(`${this._url}/${id}/documents/${docId}`, true);
    }

    async updateDocuments(id, toadd, todelete) {
        const docs = [...toadd, ...todelete];
        return await Promise.all(
            docs.map(async v => {
                return await v.todelete ? this.deleteDocument(id, v.id) : this.uploadDocument(id, v);
            })
        );
    }
}