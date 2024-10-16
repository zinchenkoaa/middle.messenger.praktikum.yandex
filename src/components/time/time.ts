import "./time.css";
import timeHtml from "./time.tmpl"
import type { Props } from "../../types";
import { Block } from "../../utils/block";

export class Time extends Block<Props> {
    render(): string {
        return timeHtml;
    }
}
