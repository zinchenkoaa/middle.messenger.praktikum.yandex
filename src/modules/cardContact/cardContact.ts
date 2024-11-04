import "./cardContact.css";
import { Message } from "../../components/message";
import { Time } from "../../components/time";
import { Block } from "../../utils/block";
import cardContactHtml from "./cardContact.tmpl";

type CardContactProps = {
    contactName: string; 
    contactMessageCount?: string; 
    contactLastMessageTime: string; 
    message?: string;
    messageInit?: Message;
    contactTime?: Time
} & Record<string, unknown>

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
