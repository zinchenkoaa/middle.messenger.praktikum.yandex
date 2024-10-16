import buttonHtml from "./button.tmpl";
import type { Props } from "../../types";
import { Block } from "../../utils/block";
import "./button.css";

interface ButtonProps extends Props {
    onClick?: (e: Event) => void,
}
  
export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super({
            ...props,      
            events: {
                click: (e: Event) => {
                    if (props.onClick) { 
                      props.onClick(e);
                    }
                  },
            },
        });
    }

    override render(): string {
        return buttonHtml;
    }
}
