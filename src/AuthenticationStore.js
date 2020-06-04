import Rest from './Rest.js';

export default class AuthenticationStore extends Rest {
    constructor() {
        super();
        this._url = `${this._baseUrl}/authentication`
    }

    async login(credential) {
        return await this._postJsonData(this._url, credential, false);
    }
}