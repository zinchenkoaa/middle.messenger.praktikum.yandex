import Handlebars from "handlebars";
import "./chat.css";
import { Link } from "../../components/link";
import { Search } from "../../components/search";
import { MessageBubble } from "../../modules/messageBubble";
import { MessageInput } from "../../modules/messageInput";
import { ContactContainer } from "../../modules/contactContainer";

const chatHtml = `
<div class="chat">
    <div class="left-panel">
        {{{ link }}}

        {{{ search }}}

        {{{ contactContainer }}}
    </div>

    <div class="all-message">
        <div class="container">
            {{{ messageBubbleOne }}}
            {{{ messageBubbleTwo }}}
            {{{ messageBubbleThree }}}
        </div>

        {{{ messageInput }}}
    </div>
</div>
`;

export function chat() {

    const tmpl = Handlebars.compile(chatHtml);
    const context = {
        link: Link({ href: "/profile", text: "Профиль"}),
        search: Search({ placeholder: "Поиск" }),
        messageBubbleOne: MessageBubble({ textMessage: "Привет! Как дела?", isUser: false }),
        messageBubbleTwo: MessageBubble({ textMessage: "Привет! Всё хорошо. Как у тебя?", isUser: true }),
        messageBubbleThree: MessageBubble({ textMessage: "Что не отвечаешь?", isUser: true }),
        messageInput: MessageInput,
        contactContainer: ContactContainer,
    }

    return tmpl(context);
}