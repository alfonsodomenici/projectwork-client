import { readToken } from './jwt.js';
export default class Rest {

    constructor() {
        this._baseUrl = 'http://localhost:8080/projectwork/resources';
        this._secureHeaders = new Headers();
        this._secureHeaders.append('Authorization', `Bearer ${readToken()}`);
        this._unsecureHeaders = new Headers();
    }

    choiceHeaders(secure){
        return secure === true ? this._secureHeaders : this._unsecureHeaders;
    }

    async _getJsonData(endpoint,secure) {
        const h = this.choiceHeaders(secure);
        const resp = await fetch(endpoint, {
            method: 'GET',
            mode: 'cors',
            headers: h
        });
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return await resp.json();
    }

    async _getBlobData(endpoint,secure) {
        const h = this.choiceHeaders(secure);
        const resp = await fetch(endpoint, {
            method: 'GET',
            headers: h
        });
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return await resp.blob();
    }

    async _postJsonData(endpoint, json, secure) {
        const h = this.choiceHeaders(secure);
        h.set('Content-Type', 'application/json');
        const resp = await fetch(endpoint, {
            method: 'POST',
            headers: h,
            body: JSON.stringify(json)
        });
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return await resp.json();
    }

    async _postFormData(endpoint, formData, secure) {
        const h = this.choiceHeaders(secure);
        h.delete('Content-Type');
        const resp = await fetch(endpoint, {
            method: 'POST',
            headers: h,
            body: formData
        });
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return await resp.json();
    }

    async _putJsonData(endpoint, json, secure) {
        const h = this.choiceHeaders(secure);
        h.set('Content-Type', 'application/json');
        const resp = await fetch(endpoint, {
            method: 'PUT',
            headers: h,
            body: JSON.stringify(json)
        });
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return await resp.json();
    }

    async _deleteJsonData(endpoint, secure) {
        const h = this.choiceHeaders(secure);
        h.delete('Content-Type');
        const resp = await fetch(endpoint, {
            method: 'DELETE',
            headers: h
        });
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp;
    }
}