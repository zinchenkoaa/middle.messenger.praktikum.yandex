import "./profileEdit.css";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { formValidation } from "../../utils/formValidation";
import { Form } from "../../components/form";
import { submitFormData } from "../../utils/submitFormData";
import profileEditHtml from "./profileEdit.tmpl";
import { Block } from "../../utils/block";
import { Link } from "../../components/link";
import { Header } from "../../components/header/header";
import { Avatar } from "../../components/avatar";

export class ProfileEdit extends Block {
    constructor() {
        super({
            avatar: new Avatar({
                changeAva: true
            }),
            header: new Header({
                className: "home-header", title: "Изменение данных"
            }),
            mailInput: new Input({
                name: "email",
                text: "Почта",
                required: true,
                value: "test@yandex.ru",
                className: "input-type",
                type: "email",
                validationType: "email",
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
            loginInput: new Input({
            name: "login",
            text: "Логин",
            required: true,
            className: "input-type",
            value: "testtestovich",
            validationType: "login",
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
            secondNameInput: new Input({
            name: "second_name",
            text: "Фамилия",
            className: "input-type",
            validationType: "name",
            value: "Тестович",
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
            phoneInput: new Input({
            name: "phone",
            text: "Телефон",
            value: "+7 (999) 999 99 99",
            type: "tel",
            className: "input-type",
            validationType: "phone",
            required: true,
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
            displayNameInput: new Input({
            name: "display_name",
            text: "Имя в чате",
            value: "Тестович",
            className: "input-type",
            validationType: "display_name",
            required: true,
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

    override  render(): string {
        const form = new Form({
            name: "formProfileEdit",
            body: profileEditHtml,
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
