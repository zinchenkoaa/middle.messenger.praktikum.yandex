import "./chat.css";
import { Link } from "../../components/link";
import { Search } from "../../components/search";
import { MessageBubble } from "../../modules/messageBubble";
import { MessageInput } from "../../modules/messageInput";
import { ContactContainer } from "../../modules/contactContainer";
import chatHtml from "./chat.tmpl";
import { Block } from "../../utils/block";

export class Chat extends Block<Record<string, unknown>>  {
    constructor() {
        super({
            link: new Link({ href: "/profile", text: "Профиль" }),
            search: new Search({ placeholder: "Поиск" }),
            messageBubbleOne: new MessageBubble({ textMessage: "Привет! Как дела?", className: "message-text", isUser: false }),
            messageBubbleTwo: new MessageBubble({ textMessage: "Привет! Всё хорошо. Как у тебя?", className: "message-text", isUser: true }),
            messageBubbleThree: new MessageBubble({ textMessage: "Что не отвечаешь?", className: "message-text", isUser: true }),
            messageInput: new MessageInput(),
            contactContainer: new ContactContainer()
        })
    }

    override render(): string {
        return chatHtml
    }
}
