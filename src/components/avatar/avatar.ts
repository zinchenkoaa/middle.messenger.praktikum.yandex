import "./avatar.css";
import avatarHtml from "./avatar.tmpl";
import type { Props } from "../../types";
import { Block } from "../../utils/block";

interface AvatarProps extends Props {
    changeAva?: boolean;
}

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super(props)
    }

    render(): string {
        return avatarHtml;
    }
}
