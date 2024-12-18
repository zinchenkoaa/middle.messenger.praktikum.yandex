import { Block } from "../../utils/block";
import "./link.css";
import type { Props } from "../../types";
import linkHtml from "./link.tmpl";

interface LinkProps extends Props {
    text: string;
    onClick: (e: Event) => void,
}

export class Link extends Block {
    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                click: (event: MouseEvent) => {
                    event.preventDefault();

                    props.onClick(event)
                },
            },
        });
    }

    render(): string {
        return linkHtml;
    }
}
