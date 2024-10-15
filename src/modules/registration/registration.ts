import "./registration.css";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Link } from "../../components/link";
import { formValidation } from "../../utils/formValidation";
import { submitFormData } from "../../utils/submitFormData";
import { Form } from "../../components/form";
import registrationHtml from "./registration.tmpl";
import { Block } from "../../utils/block";
import { Header } from "../../components/header/header";
  
  interface RegistrationProps {
    header: Header;
    mailInput: Input;
    loginInput: Input;
    firstNameInput: Input;
    secondNameInput: Input;
    phoneInput: Input;
    passwordInput: Input;
    button: Button;
    link: Link;
  }

export class Registration extends Block<RegistrationProps> {
    constructor() {
        super({
            header: new Header({ className: "home-header", title: "Регистрация"}),
            mailInput: new Input({
                name: "email",
                text: "Почта",
                required: true,
                type: "email",
                validationType: "email",
                className: "input-type",
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
                validationType: "login",
                className: "input-type",
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
            firstNameInput: new Input({
                name: "first_name",
                text: "Имя",
                required: true,
                validationType: "name",
                className: "input-type",
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
                validationType: "name",
                className: "input-type",
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
                type: "tel",
                validationType: "phone",
                className: "input-type",
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
            passwordInput: new Input({
                name: "password",
                text: "Пароль",
                type: "password",
                validationType: "password",
                className: "input-type",
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
                label: "Зарегистрироваться",
                type: "submit",
                events: {
                    submit: (event: Event) => {
                      submitFormData(event);
                    }
                  },
            }),
            link: new Link({
                href: "/",
                text: "Войти"
            })
        })
    };

   override render(): string { 
    const form = new Form({
        name: "registrationForm",
        header: `
        {{{ header }}}
        `,
        body: registrationHtml,
        settings: {
          withInternalID: true
        },
        novalidate: true
      });
    
      return form.render();
    }
}
