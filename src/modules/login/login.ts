import "./login.css";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Link } from "../../components/link";
import { Block } from "../../utils/block";
import { Header } from "../../components/header/header";
import loginTmpl from "./login.tmpl";
import { checkLoginValidaty, checkPasswordValidaty } from "../../utils/formValidation/formValidation";
import type { AllFormData } from "../../types";

type LoginProps = {
  errorLogin: string;
  errorPassword: string;
  formData: AllFormData;
} & Record<string, unknown>

export class Login extends Block<LoginProps> {
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
        onBlur: (event: Event) => {
          const login = (event.target as HTMLInputElement).value;
          this.validateField('errorLogin', login, checkLoginValidaty);
        },
        onChange: (event: Event) => {
          const login = (event.target as HTMLInputElement).value;

          this.setProps({
            formData: {
              ...this.props.formData,
              login: login,
            },
          });

          this.validateField('errorLogin', login, checkLoginValidaty);
        },
      }),
      passwordInput: new Input({
        name: "password",
        text: "Пароль",
        type: "password",
        validationType: "password",
        className: "input-type",
        required: true,
        onBlur: (event: Event) => {
          const password = (event.target as HTMLInputElement).value;
          this.validateField('errorPassword', password, checkPasswordValidaty)
        },
        onChange: (event: Event) => {
          const password = (event.target as HTMLInputElement).value;

          this.setProps({
            formData: {
              ...this.props.formData,
              password: password,
            },
          });

          this.validateField('errorPassword', password, checkPasswordValidaty);
        },
      }), 
      button: new Button({
        label: "Авторизоваться",
        type: "submit",
        onClick: (event: Event) => {
          event.preventDefault();

          this.validateField('errorLogin', this.props.formData.login, checkLoginValidaty);
          this.validateField('errorPassword', this.props.formData.password, checkPasswordValidaty);
          console.log(this.props.formData); // eslint-disable-line no-console
        }
      }),
      link: new Link({
        href: "/registration",
        text: "Нет аккаунта?"
    }),
    errorLogin: '',
    errorPassword: '',
    formData: {
      login: '',
      password: '',
    },
    });
  }

  validateField(field: string, value: string, validator: (value: string) => { errorMessage: string | null }): void {
    this.setProps({
      [field]: validator(value).errorMessage ?? '',
    });
  }

  override render(): string {
    return loginTmpl;
  }
}
