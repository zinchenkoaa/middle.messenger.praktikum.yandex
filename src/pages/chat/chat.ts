import "./chat.css";
import { Search } from "../../components/search";
import chatHtml from "./chat.tmpl";
import { Block } from "../../utils/block";
import Router from "../../route/Router";
import AddUserToChatController from "../../controller/addUserController";
import ModalAdd from "../../components/modal/modal";
import {Button} from "../../components/button";
import store from "../../utils/store/store";
import ModalCreateChatController from '../../controller/createChatController';

const addUserToChatController = new AddUserToChatController();
const modalCreateChatController = new ModalCreateChatController();
const deleteUserFromChatController = new DeleteUserFromChatController();
import ChatsController from "../../controller/chatsController";
import ContactContainer from "../../modules/contactContainer/contactContainer";
import ChatMessages from "../../components/chatMessages/chatMessages";
import DeleteChatController from "../../controller/deleteChatController";
import DeleteUserFromChatController from "../../controller/deleteUserFromChatController";

const router = new Router('#root');

const chatsController = new ChatsController();
const deleteChatController = new DeleteChatController();

export default class Chat extends Block {
    constructor() {
        chatsController.getChats();
        super({
            link: new Button({ label: "Профиль", onClick:() => router.go('/settings') }),
            search: new Search({ placeholder: "Поиск" }),
            chatMessages: new ChatMessages({}),
            contactContainer: new ContactContainer({}),
            addUser: new ModalAdd({ btnName: 'Добавить', controller: addUserToChatController, modalName: 'addUserToChat', title: 'Добавить участника',  }),
            buttonAdd: new Button({
                label: 'Создать чат',
                onClick: () => {
                    store.set('ui.modalActive.name', 'createChat');
                }
            }),
            modalDeleteChat: new ModalAdd({
                title: 'Удалить чат',
                btnName: 'Удалить',
                modalName: 'deleteChat',
                controller: deleteChatController,
                inputHidden: true,
            }),
            modalDeleteUserFromChat: new ModalAdd({
                title: 'Удалить пользователя?',
                btnName: 'Удалить',
                modalName: 'deleteUserFromChat',
                controller: deleteUserFromChatController,
                inputHidden: true,
            }),
            modalCreateChat: new ModalAdd({
                title: 'Создать чат',
                btnName: 'Создать',
                modalName: 'createChat',
                controller: modalCreateChatController
            })
        })
    }

    public render(): string {
        return chatHtml
    }
}
