import ChatApi from "../api/chat";
import store from "../utils/store/store";

const chatApi = new ChatApi();

export default class ChatsController {
    public async getChats() {
        try {
            const chatResponse = await chatApi.request();
            if (chatResponse.status === 200){
                store.set('chats', JSON.parse(chatResponse.response))
            }

        } catch (error) {
            console.log(error);
        }
    }

    public async getChatUsers(chatId: number) {
        try {
            const chatResponse = await chatApi.getChatUsers(chatId);
            if (chatResponse.status === 200){
                store.set('chatUsers', JSON.parse(chatResponse.response))
            }

        } catch (error) {
            console.log(error);
        }
    }

}
