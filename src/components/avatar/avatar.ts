import "./avatar.css";
import avatarHtml from "./avatar.tmpl";
import { Block } from "../../utils/block";

type AvatarProps = {
    changeAva?: boolean;
} & Record<string, unknown>

export class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super(props)
    }

    render(): string {
        return avatarHtml;
    }
}
