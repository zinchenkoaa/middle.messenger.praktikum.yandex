import Handlebars from "handlebars";
import "./cardContact.css";
import { Message } from "../../components/message";
import { Time } from "../../components/time";

const cardContactHtml = `
<div class="contact-card">

    <img class="avatar" src="https://via.placeholder.com/50" alt="Аватар">

    <div class="contact-info">
        <div class="contact-header">
            <div class="contact-card__info">
                <span class="contact-name">{{ contactName }}</span>

                {{#if message}}
                    {{{ message }}}
                {{/if}}
            </div>

            <div class="info">
                {{{ contactTime }}}

                {{#if contactMessageCount}}
                    <div class="unread-messages-count">{{ contactMessageCount }}</div>
                {{/if}}
            </div>
        </div>
    </div>
</div>
`;

interface CardContactProps {
    contactName: string; 
    message?: string; 
    contactMessageCount?: string; 
    contactLastMessageTime: string; 
}

export function CardContact({
    contactName, 
    message, 
    contactMessageCount, 
    contactLastMessageTime}: CardContactProps) {
    const tmpl = Handlebars.compile(cardContactHtml);

    const context = {
        contactName, 
        message: Message({ textMessage: message || '' }), 
        contactMessageCount, 
        contactLastMessageTime,
        contactTime: Time({ time: contactLastMessageTime, className: "card-time" })
    }

    return tmpl(context);
}