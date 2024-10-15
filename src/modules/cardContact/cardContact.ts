import "./cardContact.css";
import { Message } from "../../components/message";
import { Time } from "../../components/time";
import { Block } from "../../utils/block";

const cardContactHtml = `
<div class="contact-card">

    <img class="avatar" src="https://via.placeholder.com/50" alt="Аватар">

    <div class="contact-info">
        <div class="contact-header">
            <div class="contact-card-info">
                <span class="contact-name">{{ contactName }}</span>

                {{#if messageInit}}
                    {{{ messageInit }}}
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
    contactMessageCount?: string; 
    contactLastMessageTime: string; 
    message?: string;
    messageInit?: Message;
    contactTime?: Time
}

export class CardContact extends Block<CardContactProps> {
    constructor(props: CardContactProps) {
        super({...props,
            messageInit: new Message({ textMessage: props.message ?? '', className: "last-message" }),
            contactTime: new Time({ time: props.contactLastMessageTime, className: "card-time" }),
        })
    }

    protected render(): string {
        return cardContactHtml;
    }
}
