import "./message.css";
import { Block } from "../../utils/block";
import messageHtml from "./message.tmpl";

export class Message extends Block {
    public render(): string {
        return messageHtml;
    }
}
