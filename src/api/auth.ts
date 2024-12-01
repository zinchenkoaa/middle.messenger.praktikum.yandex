import HTTP from '../utils/HTTPtransport/HTTPtransport';
import BaseAPI from '../utils/HTTPtransport/base';


export default class AuthApi extends BaseAPI {
    private apiInstance: HTTP;

    constructor() {
        super('auth');
        this.apiInstance = new HTTP();
    }

    public create(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.post(`${this.apiURL}/signup`, { data })
    }

    public updateUser(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.post(`${this.apiURL}/user/profile`, { data })
    }

    public login(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.post(`${this.apiURL}/signin`, { data });
    }

    public logout(): Promise<XMLHttpRequest> {
        return this.apiInstance.post(`${this.apiURL}/logout`);
    }

    public getUser(): Promise<XMLHttpRequest> {
        return this.apiInstance.get(`${this.apiURL}/user`)
    }
}
