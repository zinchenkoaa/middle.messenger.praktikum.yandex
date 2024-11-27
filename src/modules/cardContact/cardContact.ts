import "./cardContact.css";
import { Message } from "../../components/message";
import { Time } from "../../components/time";
import { Block } from "../../utils/block";
import cardContactHtml from "./cardContact.tmpl";

export class CardContact extends Block {
    constructor(props: ChatItemSettings) {
        super({...props,
            events: {
                click: (e :Event) => props.onClick && props.onClick(e)
            },
            messageInit: new Message({ textMessage: props.last_message?.content ?? '', className: "last-message" }),
            contactTime: new Time({ time: '22:22', className: "card-time" }),
        })
    }

    public render(): string {
        return cardContactHtml;
    }
}
