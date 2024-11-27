import {Block} from "../../utils/block";
import "./chatMessages.css";
import chatMessagesHtml from "./chatMessages.tmpl";
import store from "../../utils/store/store";
import connect from "../../utils/store/connect";
import {MessageBubble} from "../../modules/messageBubble";
import {Link} from "../link";
import {MessageInput} from "../../modules/messageInput";
import ChatProfileUser from "../chatProfile/chatProfile";
import UsersDr from "../userDr/userDr";
import messagesController from "../../controller/messagesController";

const mapStateToProps = (state:State) => {
    const currentChat = state.currentChat;
    return {
        name: currentChat.title,
        currentChatId: state.ui.currentChatId
    }

}

const ChatProfile = connect(ChatProfileUser, mapStateToProps);


class ChatMessages extends Block {
    constructor(props: Indexed) {
        super({...props,
            Messages: [],
            buttonAdd: new Link({
                text: 'Добавить участника',
                onClick: () => {
                    store.set('ui.modalActive.name', 'addUserToChat');
                }
            }),
            buttonDelete: new Link({
                text: 'Удалить чат',
                onClick: () => {
                    store.set('ui.modalActive.name', 'deleteChat');
                }
            }),
            messageInput: new MessageInput({
                controller: messagesController
            }),
            chatProfile: new ChatProfile({
                isProfile: false,
            }),
            usersDr: new UsersDr({})
        });
    }

    public render(): string {
        return chatMessagesHtml
    }
}

function mapUserToProps(state: State):Indexed {
    return {
        currentChatId: state.ui.currentChatId,
        messages: state.messages
    };
}

const createItemCallback =  (prop:Indexed) => {
    console.log(prop)
    return new MessageBubble(prop)
}
const listUpdateProps = {
    key:'messages',
    createItemCallback,
}

function mapStateToListProps(state: Indexed<any>): Indexed {
    return  state.messages.filter((message: Indexed) => message.type === 'message') as Indexed;
}

export default connect(ChatMessages, mapUserToProps, listUpdateProps, mapStateToListProps);
