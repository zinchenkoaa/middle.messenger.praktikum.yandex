import Handlebars from "handlebars";
import "./login.css";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Link } from "../../components/link";

const loginHtml = `
        <div class="login">
            <div class="login__inputs">
                {{{ loginInput }}}
                {{{ passwordInput }}}
            </div>

            <div class="login__footer">
                {{{ button }}}

                {{{ link }}}
            </div>
        </div>
    `;

export function login() {

    const tmpl = Handlebars.compile(loginHtml);
    const context = {
        loginInput: Input({
            name: "login",
            text: "Логин",
            required: true,
            errorMessage: "Неверный логин"
        }),
        passwordInput: Input({
            name: "password",
            text: "Пароль",
            type: "password",
            required: true,
            errorMessage: "Неверный пароль"
        }),
        button: Button({
            label: "Авторизоваться",
        }),
        link: Link({
            href: "/registration",
            text: "Нет аккаунта?"
        })
    };

    return tmpl(context);
}