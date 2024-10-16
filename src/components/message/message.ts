import "./message.css";
import type { Props } from "../../types";
import { Block } from "../../utils/block";
import messageHtml from "./message.tmpl";

interface MessageProps extends Props {
    textMessage: string;
    className: string;
}

export class Message extends Block<MessageProps> {
    render(): string {
        return messageHtml;
    }
}
