import store from "../utils/store/store";
import ChatApi from "../api/chat";

const chatApi = new ChatApi();

export default class ModalCreateChatController implements FormController {
    public async createChat() {
        try {
            const value = store.getState('ui.modalActive.value');


            const chatResponse = await chatApi.createChat({ title: value });
            if (chatResponse.status != 200) {
                throw new Error('Chat not created')
            }
            const chatsResponse = await chatApi.request();
            store.set('chats', JSON.parse(chatsResponse.response))

        } catch (error) {
            throw error;
        }
    }

    public onSubmit() {
        this.createChat();
    }
}
