import {Block} from "../../utils/block";
import "./profilePhoto.css";
import profileHtml from "./profilePhoto.tmpl";

export default class ProfilePhoto extends Block {
        constructor(props:Indexed) {
            super({
                ...props,
            });
        }

    public render(): string {
            return profileHtml;
        }
    }
