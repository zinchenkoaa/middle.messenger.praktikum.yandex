import "./chat.css";
import { Search } from "../../components/search";
import chatHtml from "./chat.tmpl";
import { Block } from "../../utils/block";
import Router from "../../route/Router";
import addUserToChatController from "../../controller/addUserController";
import ModalAdd from "../../components/modal/modal";
import {Button} from "../../components/button";
import store from "../../utils/store/store";
import ChatsController from "../../controller/chatsController";
import ContactContainer from "../../modules/contactContainer/contactContainer";
import ChatMessages from "../../components/chatMessages/chatMessages";
import deleteChatController from "../../controller/deleteChatController";
import deleteUserFromChatController from "../../controller/deleteUserFromChatController";
import createChatController from "../../controller/createChatController";
import {Link} from "../../components/link";

const router = new Router('#root');

const chatsController = new ChatsController();

export default class Chat extends Block {
    constructor() {
        chatsController.getChats();
        super({
            link: new Link({ text: "Профиль", onClick:() => router.go('/settings') }),
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
                controller: createChatController
            })
        })
    }

    public render(): string {
        return chatHtml
    }
}
