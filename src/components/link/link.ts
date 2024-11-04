import { Block } from "../../utils/block";
import "./link.css";
import type { Props } from "../../types";
import linkHtml from "./link.tmpl";

interface LinkProps extends Props {
    href: string;
}

export class Link extends Block<LinkProps> {
    render(): string {
        return linkHtml;
    }
}
