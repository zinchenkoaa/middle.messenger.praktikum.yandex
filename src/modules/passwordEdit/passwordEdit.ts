import "./passwordEdit.css";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { formValidation } from "../../utils/formValidation";
import { Form } from "../../components/form";
import { submitFormData } from "../../utils/submitFormData";
import passwordEditHtml from "./passwordEdit.tmpl";
import { Block } from "../../utils/block";
import { Header } from "../../components/header/header";
import { Avatar } from "../../components/avatar";
import { Link } from "../../components/link";

export class PasswordEdit extends Block {
  constructor() {
    super({
      avatar: new Avatar({}),
    header: new Header({
        className: "home-header", title: "Изменить пароль"
    }),
      oldPassword: new Input({
        name: "oldPassword",
        text: "Старый пароль",
        type: "password",
        className: "input-type",
        validationType: "password",
        events: {
          focus: (event: Event) => {
            formValidation(event);
          },
          blur: (event: Event) => {
            formValidation(event);
          },
          input: (event: Event) => {
            formValidation(event);
          }
        }
      }),
      newPassword: new Input({
        name: "newPassword",
        text: "Новый пароль",
        type: "password",
        className: "input-type",
        validationType: "password",
        events: {
          focus: (event: Event) => {
            formValidation(event);
          },
          blur: (event: Event) => {
            formValidation(event);
          },
          input: (event: Event) => {
            formValidation(event);
          }
        }
      }),
      repeatPassword: new Input({
        name: "repeatPassword",
        text: "Повторите новый пароль",
        type: "password",
        className: "input-type",
        validationType: "password",
        events: {
          focus: (event: Event) => {
            formValidation(event);
          },
          blur: (event: Event) => {
            formValidation(event);
          },
          input: (event: Event) => {
            formValidation(event);
          }
        }
      }),
      button: new Button({
        label: "Сохранить",
        type: "submit"
    }),
    link: new Link({
      href: "/profile",
      text: "Назад"
  }),
    })
  }

  render(): string {
    const form = new Form({
        name: "formPasswordEdit",
        body: passwordEditHtml,
        events: {
            submit: (event: Event) => {
                event.preventDefault();
                submitFormData(event);
            }
        },
        novalidate: true,
        settings: {
            withInternalID: true
        }
    });

    return form.render();
  }
}
