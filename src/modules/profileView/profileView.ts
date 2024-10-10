import Handlebars from "handlebars";
import "./profileView.css";
import { Input } from "../../components/input";

const profileViewHtml =     `
<div class="profile-view">
    {{{ mailInput }}}
    {{{ loginInput }}}
    {{{ firstNameInput }}}
    {{{ secondNameInput }}}
    {{{ displayNameInput }}}
    {{{ phoneInput }}}
</div>

<div class="profile-view-links">
    <div class="profile-view-link"><a href="/profile-edit">Изменить данные</a></div>
    <div class="profile-view-link"><a href="/password-edit">Изменить пароль</a></div>
    <div class="profile-view-link profile-view-linklogout"><a href="/">Выйти</a></div>
</div>
`;

export function profileView() {
    const tmpl = Handlebars.compile(profileViewHtml);
    
    const context = {
        mailInput: Input({
            name: "email",
            text: "Почта",
            value: "test@yandex.ru",
            required: true,
            disabled: true,
            type: "email",
        }),
        loginInput: Input({
            name: "login",
            text: "Логин",
            value: "testtestovich",
            required: true,
            disabled: true,
        }),
        firstNameInput: Input({
            name: "first_name",
            text: "Имя",
            value: "Тест",
            required: true,
            disabled: true,
        }),
        secondNameInput: Input({
            name: "second_name",
            text: "Фамилия",
            value: "Тестович",
            disabled: true,
        }),
        displayNameInput: Input({
            name: "display_name",
            text: "Имя в чате",
            value: "Тестович",
            disabled: true,
        }),
        phoneInput: Input({
            name: "phone",
            text: "Телефон",
            value: "+7 (999) 999 99 99",
            type: "tel",
            required: true,
            disabled: true,
        })
    };

    return tmpl(context);
}
