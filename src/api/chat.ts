import HTTP from '../utils/HTTPtransport/HTTPtransport';
import BaseAPI from "../utils/HTTPtransport/base";

export default class ChatApi extends BaseAPI {
    private apiInstance: HTTP;

    constructor() {
        super('chats');
        this.apiInstance = new HTTP();
    }

    public  deleteChat(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.delete(`${this.apiURL}/`, { data })

    }
    public  createChat(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.post(`${this.apiURL}/`, { data })
    }

    public  addUser(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.put(`${this.apiURL}/users`, { data })
    }

    public  deleteUser(data: Indexed): Promise<XMLHttpRequest> {
        return this.apiInstance.delete(`${this.apiURL}/users`, { data })
    }

    public  getChatToken(chatId:number): Promise<XMLHttpRequest> {
        return this.apiInstance.post(`${this.apiURL}/token/${chatId}`)
    }

    public  getChatUsers(chatId:number): Promise<XMLHttpRequest> {
        return this.apiInstance.get(`${this.apiURL}/${chatId}/users`)
    }

    public request(): Promise<XMLHttpRequest> {
        return this.apiInstance.get(`${this.apiURL}/`);
    }


}
