import "./login.css";
import { Form } from "../../components/form";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Link } from "../../components/link";
import { submitFormData } from "../../utils/submitFormData";
import { formValidation } from "../../utils/formValidation";
import { Block } from "../../utils/block";
import { Header } from "../../components/header/header";
import loginTmpl from "./login.tmpl";

export class Login extends Block {
  constructor() {
    super({
      header: new Header({ className: "home-header", title: "Вход" }),
      loginInput: new Input({
        name: "login",
        text: "Логин",
        type: 'text',
        className: "input-type",
        required: true,
        validationType: "login",
        events: {
          onfocus: (event: Event) => {
            formValidation(event);      
          },
          onblur: (event: Event) => {
            formValidation(event);      
          },
          onchange: (event: Event) => {
            formValidation(event);  
          }
        }
      }),
      passwordInput: new Input({
        name: "password",
        text: "Пароль",
        type: "password",
        validationType: "password",
        className: "input-type",
        required: true,
        events: {
          onfocus: (event: Event) => {
            formValidation(event);      
          },
          onblur: (event: Event) => {
            formValidation(event);      
          },
          onchange: (event: Event) => {
            formValidation(event);  
          }
        }
      }), 
      button: new Button({
        label: "Авторизоваться",
        type: "submit",
        events: {
          submit: (event: Event) => submitFormData(event)
        }
      }),
      link: new Link({
        href: "/registration",
        text: "Нет аккаунта?"
    }),
    });
  }

  override render(): string {
    const form = new Form({
        name: "formWithLogin",
        header: `
        {{{ header }}}
        `,
        body: loginTmpl,
        novalidate: true,
        settings: {
            withInternalID: true
        }
    });

    return form.render();
  }
}
