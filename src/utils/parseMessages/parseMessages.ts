import store from "../store/store";

function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month} ${hours}:${minutes}`;
}

const parseMessage = (userId: number) => (message: Message) => {
    return {
        ...message,
        time: formatDateTime(message.time),
        isSender: message.user_id === userId
    }
}

function parseAndStoreMessages(messages: Message[], userId: number) {
    const parseMessageFunc = parseMessage(userId);
    const mappedMessages = messages
        .reverse()
        .map(parseMessageFunc)
    // .reduce((acc: Record<number, Message[]>, message) => {
    //   if (!acc[message.chat_id]) {
    //     acc[message.chat_id] = [];
    //   }
    //   acc[message.chat_id].push(message);
    //   return acc;
    // }, {});
    store.set('messages', mappedMessages);
}

function addMessageToStore(newMessage: Message, userId: number) {
    const messages = store.getState('messages' ) as Message[];
    const parsedNewMessage = parseMessage(userId)(newMessage)
    store.set(`messages`, [...messages, parsedNewMessage]);
}

export { parseAndStoreMessages, addMessageToStore };
