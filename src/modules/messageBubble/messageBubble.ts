import "./messageBubble.css";
import { Message } from "../../components/message";
import { Time } from "../../components/time";
import { Block } from "../../utils/block";

const messageBubbleHtml = `
<div class="message-container {{#if isUser}}from-user{{else}}from-other{{/if}}">
    <div class="message-bubble">
        {{{ contactMessage }}}
        
        {{{ messageTime }}}
    </div>
</div>
`;

interface MessageProps {
    textMessage: string;
    className?: string;
    isUser: boolean;
}

export class MessageBubble extends Block {
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
