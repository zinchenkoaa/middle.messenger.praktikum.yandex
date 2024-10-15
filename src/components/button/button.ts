import buttonHtml from "./button.tmpl";
import type { Props } from "../../types";
import { Block } from "../../utils/block";
import "./button.css";
  
export class Button extends Block<Props> {
    constructor(props: Props) {
        super(props);
    }

    override render(): string {
        return buttonHtml;
    }
}
