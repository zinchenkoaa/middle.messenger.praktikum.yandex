import "./messageBubble.css";
import { Message } from "../../components/message";
import { Time } from "../../components/time";
import { Block } from "../../utils/block";
import messageBubbleHtml from "./messageBubble.tmpl";

export class MessageBubble extends Block {
    constructor(props: Indexed) {
        super({...props,
            contactMessage: new Message({ textMessage: props.text, className: props.className ?? 'message-text' }),
            messageTime: new Time({ time: props.time})
        });
    }

    render(): string {
        return messageBubbleHtml;
    }
}
