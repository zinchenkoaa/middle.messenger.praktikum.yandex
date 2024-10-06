import Handlebars from "handlebars";
import "./messageInput.css";
import send from "../../static/send.svg";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

const messageInputHtml = `
<div class="message-input">
    {{{ imageButton }}}

    {{{ sendInput }}}
    
    {{{ sendButton }}}

    {{{ emojiButton }}}
</div>
`;

export function MessageInput() {
    const tmpl = Handlebars.compile(messageInputHtml);

    const context = {
        sendInput: Input({ type: "text", className: "message-field", placeholder: "Введите сообщение..." }),
        imageButton: Button({ className: "image-btn", label: "📷" }),
        sendButton: Button({ className: "send-btn", label: `<img src="${send}" />` }),
        emojiButton: Button({ className: "emoji-btn", label: "😊" },),
    };

    return tmpl(context)
}