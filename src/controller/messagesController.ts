import WebSocketTransport from "../utils/websoket/websoket";
import ChatApi from "../api/chat";
import store from "../utils/store/store";
import {addMessageToStore, parseAndStoreMessages} from "../utils/parseMessages/parseMessages";

const chatApi = new ChatApi();

class MessageController implements MessageControllerInterface {
    private socket: WebSocketTransport;
    public async start() {
        const baseURL = 'wss://ya-praktikum.tech/ws/chats';

        const CHAT_ID = store.getState('ui.currentChatId') as number;
        const USER_ID = store.getState('auth.user.id') as number;
        const tokenResponse = await chatApi.getChatToken(CHAT_ID);

        if (tokenResponse.status === 200) {
            const TOKEN = JSON.parse(tokenResponse.response).token;
            const url = `${baseURL}/${USER_ID}/${CHAT_ID}/${TOKEN}`
            this.socket = new WebSocketTransport(url);

            this.socket.on('open', () => {
                this.socket.send(JSON.stringify({
                    content: "0",
                    type: "get old"
                }));
            });

            this.socket.on('close', () => {
                console.log('Соединение закрыто');
            });

            this.socket.on('message', (message: Message) => {
                if (Array.isArray(message)) {
                    parseAndStoreMessages(message, USER_ID)
                    console.log(store.getState())
                } else {
                    addMessageToStore(message, USER_ID);
                }
            });

            this.socket.on('ping', () => {});
            this.socket.on('pong', () => {});

            this.socket.connect();
        }
    }

    public send(message:string) {
        this.socket.send(JSON.stringify({
            content: message,
            type: "message"
        }))
    }
}

export default new MessageController();
