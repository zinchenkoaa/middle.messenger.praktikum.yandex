import Handlebars from "handlebars";
import "./passwordEdit.css";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

const passwordEditHtml =     `
<div class="password-edit">
    {{{ oldPassword }}}
    {{{ newPassword }}}
    {{{ repeatPassword }}}
     
    <div class="password-edit-button">
        {{{ button }}}
    </div>
</div>
`;

export function passwordEdit() {
    const tmpl = Handlebars.compile(passwordEditHtml);

    const context = {
        oldPassword: Input({
            name: "oldPassword",
            text: "Старый пароль",
            type: "password",
            required: true,
            errorMessage: "Неверный пароль",
        }),
        newPassword: Input({
            name: "newPassword",
            text: "Новый пароль",
            type: "password",
            required: true,
        }),
        repeatPassword: Input({
            name: "repeatPassword",
            text: "Повторите новый пароль",
            type: "password",
            required: true,
            errorMessage: "Пароли не совпадают",
        }),
        button: Button({ label: "Сохранить" })
    };

    return tmpl(context);
}
