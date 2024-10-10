import Handlebars from "handlebars";
import "./messageBubble.css";
import { Message } from "../../components/message";
import { Time } from "../../components/time";

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

export function MessageBubble({ textMessage, className = "message-text", isUser }: MessageProps) {
    const tmpl = Handlebars.compile(messageBubbleHtml);

    const context = {
        contactMessage: Message({ 
            textMessage, 
            className,
        }),
        isUser,
        messageTime: Time({ time: "10:45" }),
    };

    return tmpl(context);
}
