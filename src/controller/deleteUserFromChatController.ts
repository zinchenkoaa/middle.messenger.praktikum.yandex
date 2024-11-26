import store from "../utils/store/store";
import ChatApi from "../api/chat";

const chatApi = new ChatApi();

export default class DeleteUserFromChatController implements FormController {
    public async deleteUser() {
        try {
            const userId = store.getState('ui.modalActive.value');
            const chatId = store.getState('ui.currentChatId');
            const deleteUserResponse = await chatApi.deleteUser({ users: [userId], chatId });
            if (deleteUserResponse.status!= 200) {
                throw new Error('Error delete user');
            }
            console.log('пользователь удален');
        } catch (error) {
            console.log(error);
        }
    }

    public onSubmit() {
        this.deleteUser();
    }
}
