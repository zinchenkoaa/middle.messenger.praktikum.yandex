import HTTP from '../utils/HTTPtransport/HTTPtransport';
import BaseAPI from "../utils/HTTPtransport/base";

export default class UserApi extends BaseAPI {
    private apiInstance: HTTP;

    constructor() {
        super('user');
        this.apiInstance = new HTTP();
    }

    public create(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.post(`${this.apiURL}/signup`, { data})
    }

    public searchUser(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.post(`${this.apiURL}/search`, { data })
    }

    public updateUser(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.put(`${this.apiURL}/profile`, { data })
    }

    public updatePassword(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.put(`${this.apiURL}/password`, { data })
    }

    public updateAvatar(data: FormData): Promise<XMLHttpRequest> {
        return this.apiInstance.put(`${this.apiURL}/profile/avatar`, { data })
    }
}
