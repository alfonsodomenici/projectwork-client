import Rest from "./Rest.js";

export default class UserStore extends Rest {
    constructor() {
        super();
        this._url = `${this._baseUrl}/users`;
    }

    async create(user) {
        return await this._postJsonData(this._url, user, false);
    }

}