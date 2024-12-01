import "./messageBubble.css";
import { Message } from "../../components/message";
import { Time } from "../../components/time";
import { Block } from "../../utils/block";
import messageBubbleHtml from "./messageBubble.tmpl";

type MessageProps = {
    textMessage: string;
    className?: string;
    isUser: boolean;
} & Record<string, unknown>

export class MessageBubble extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super({...props,
            contactMessage: new Message({ textMessage: props.textMessage, className: props.className ?? 'message-text' }),
            messageTime: new Time({ time: "10:45" })
        });
    }

    render(): string {    
        return messageBubbleHtml;
    }
}
