import "./messageBubble.css";
import { Message } from "../../components/message";
import { Time } from "../../components/time";
import { Block } from "../../utils/block";

export class MessageBubble extends Block {
    constructor(props: Indexed) {
        super({...props,
            contactMessage: new Message({ textMessage: props.content, className: props.content ? 'message-text' : 'last-message' }),
            messageTime: new Time({ time: props.time})
        });
    }

    render(): string {
        const messageClass = this.props.isSender ? 'from-user' : 'from-other'
        return `
<div class="message-container ${messageClass}">
    <div class="message-bubble">
        {{{ contactMessage }}}

        {{{ messageTime }}}
    </div>
</div>
`;
    }
}
