import "./messageInput.css";
import send from "../../static/send.svg";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import messageInputHtml from "./messageInput.tmpl";
import { Block } from "../../utils/block";

export class MessageInput extends Block {
    constructor() {
        super({
            sendInput: new Input({ type: "text", className: "message-field", placeholder: "Введите сообщение..." }),
            imageButton: new Button({ className: "image-btn", label: "📷" }),
  sendButton: new Button({ className: "send-btn", label: `<img src="${send}" />` }),
  emojiButton:  new Button({ className: "emoji-btn", label: "😊" })

        })
    }

    override render(): string {
        return messageInputHtml
    }
}
