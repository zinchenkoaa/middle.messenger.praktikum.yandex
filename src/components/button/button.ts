import buttonHtml from "./button.tmpl";
import { Block } from "../../utils/block";
import "./button.css";

export class Button extends Block {
    constructor(props: ButtonSettings) {
        super({
            ...props,
            events: {
                click: props.onClick
            },
        });
    }

    public render(): string {
        return buttonHtml;
    }
}
