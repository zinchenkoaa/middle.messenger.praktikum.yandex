import Handlebars from "handlebars";
import "./avatar.css";
import noAvatar from "../../static/noAvatar.svg";

const avatarHtml = `
<div class="ava">
    <img src="${noAvatar}" alt="Аватар" class="ava-img">

    {{#if changeAva}}
        <div class="ava-overlay">Cменять аватар</div>
    {{/if}}
</div>
`;

interface AvatarProps {
    changeAva?: boolean;
}

export function Avatar({changeAva = false}: AvatarProps) {
    const tmpl = Handlebars.compile(avatarHtml);

    const context = {
        changeAva
    }

    return tmpl(context);
}