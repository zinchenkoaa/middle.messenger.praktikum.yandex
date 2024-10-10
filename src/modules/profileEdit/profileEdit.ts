import Handlebars from "handlebars";
import "./profileEdit.css";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

const profileEditHtml =     `
<div class="profile-edit">
    {{{ mailInput }}}
    {{{ loginInput }}}
    {{{ firstNameInput }}}
    {{{ secondNameInput }}}
    {{{ displayNameInput }}}
    {{{ phoneInput }}}
    <div class="profile-edit-button">
        {{{ button }}}
    </div>
</div>
`;

export function profileEdit() {
    const tmpl = Handlebars.compile(profileEditHtml);

    const context = {
        mailInput: Input({
            name: "email",
            text: "Почта",
            value: "test@yandex.ru",
            required: true,
            type: "email",
            errorMessage: "Неверная почта",
        }),
        loginInput: Input({
            name: "login",
            text: "Логин",
            value: "testtestovich",
            required: true,
            errorMessage: "Неверный логин",
        }),
        firstNameInput: Input({
            name: "first_name",
            text: "Имя",
            value: "Тест",
            required: true,
            errorMessage: "Неверное имя",
        }),
        secondNameInput: Input({
            name: "second_name",
            text: "Фамилия",
            value: "Тестович",
            errorMessage: "Неверная фамилия",
        }),
        displayNameInput: Input({
            name: "display_name",
            text: "Имя в чате",
            value: "Тестович",
            errorMessage: "Неверное имя в чате",
        }),
        phoneInput: Input({
            name: "phone",
            text: "Телефон",
            value: "+7 (999) 999 99 99",
            type: "tel",
            required: true,
            errorMessage: "Неверный телефон",
        }),
        button: Button({ label: "Сохранить" })
    };

    return tmpl(context);
}
