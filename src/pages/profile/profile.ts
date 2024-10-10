import Handlebars from "handlebars";
import "./profile.css";
import { profileView } from "../../modules/profileView";
import { profileEdit } from "../../modules/profileEdit";
import { passwordEdit } from "../../modules/passwordEdit";
import { Header } from "../../components/header/header";
import { Avatar } from "../../components/avatar";

const profileHtml =     `
<main class="profile">
    <div class="profile-wrapper">
        <div class="profile-content">
            <div class="profile-content-container">
                {{{ avatar }}}

                {{#if header}}
                    {{{ header }}}
                {{/if}}
                
                {{{ content }}}
            </div>
        </div>
    </div>
</main>
`;

export function profile(inner = "profileView") {

    const tmpl = Handlebars.compile(profileHtml);
    let context = {};

    switch (inner) {
        case "profileEdit":
            context = {
                avatar: Avatar({ changeAva: true }),
                content: profileEdit
            }
            break;
        case "passwordEdit":
            context = {
                avatar: Avatar({}),
                content: passwordEdit
            }
            break;
        default:
            context = { 
                avatar: Avatar({}),
                header: Header({tag: "h1", className: "profile-header", title: "Test"}),
                content: profileView };
            break;
    }

    return tmpl(context);
}
