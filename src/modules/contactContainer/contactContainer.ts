import "./contactContainer.css";
import { CardContact } from "../../modules/cardContact";
import { Block } from "../../utils/block";
import contactContainerHtml from "./contactContainer.tmpl";
import ChatsController from "../../controller/chatsController";
import MessagesController from '../../controller/messagesController';
import store from "../../utils/store/store";
import connect from "../../utils/store/connect";

const chatsController = new ChatsController();
const messagesController = new MessagesController();

type ChatListSettings = {
    chats: ChatItemSettings[]
}

class ContactContainer extends Block {
    constructor(props: ChatListSettings) {
        super({
            chatItemsList: [],
            ...props
        })
    }

    public render(): string {
        return contactContainerHtml;
    }
}

function mapUserToProps(state:Indexed) {
    return {
        chats: state.chats,
        test: state.test,
    };
}
const createItemCallback =  (prop: ChatItemSettings) => {
    return new CardContact(
        {...prop,
            onClick: () => {
                store.set('ui.currentChatId', prop.id);
                store.set('currentChat', { id: prop.id, title: prop.title });
                chatsController.getChatUsers(prop.id)
                messagesController.start();
                console.log('store', store.getState())
            }
        })
}
const listUpdateProps = {
    key:'chatItemsList',
    createItemCallback,
}

function mapStateToListProps(state:Indexed):Indexed {
    return state.chats as Indexed;
}


export default connect(ContactContainer, mapUserToProps, listUpdateProps, mapStateToListProps)
