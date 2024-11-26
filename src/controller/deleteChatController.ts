import ChatApi from "../api/chat";
import store from "../utils/store/store";


const chatApi = new ChatApi();

export default class DeleteChatController implements FormController {
    public async deleteChat() {
        try {
            const chatId = store.getState('ui.currentChatId');
            console.log('chatId', chatId)
            if (chatId === null) {
                throw new Error('chat is not chosen');
            }
            const chatResponse = await chatApi.deleteChat({ chatId })
            console.log(chatResponse.response)
            if (chatResponse.status != 200) {
                throw new Error('Error delete chat');
            }
            const chatsResponse = await chatApi.request();
            store.set('chats', JSON.parse(chatsResponse.response))

        } catch (error) {
            console.log(error);
        }
    }

    public onSubmit() {
        this.deleteChat();
    }
}
