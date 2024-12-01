export default class BaseAPI {

    protected apiURL: string;

    constructor(apiURL: string) {
        if (!apiURL) {
            throw new Error('Api URL is required');
        }
        this.apiURL = `https://ya-praktikum.tech/api/v2/${apiURL}`;
    }

    create(data?: unknown): Promise<XMLHttpRequest>  { throw new Error(`Not implemented ${data}}`); }

    request() { throw new Error('Not implemented'); }

    update() { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }
}
