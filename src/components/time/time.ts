import "./time.css";
import timeHtml from "./time.tmpl"
import { Block } from "../../utils/block";

export class Time extends Block {
    public render(): string {
        return timeHtml;
    }
}
