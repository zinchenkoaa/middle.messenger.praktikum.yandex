import "./registration.css";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Link } from "../../components/link";
import registrationHtml from "./registration.tmpl";
import { Block } from "../../utils/block";
import { Header } from "../../components/header/header";
import type { AllFormData } from "../../types";
import { checkEmailValidaty, checkLoginValidaty, checkNameValidaty, checkPasswordValidaty, checkPhoneValidaty } from "../../utils/formValidation/formValidation";
  
type RegistrationProps = {
    errorFirstName: string;
    errorMail: string;
    errorLogin: string;
    errorSecondName: string;
    errorPhone: string;
    errorPassword: string;
    formData: AllFormData;
} & Record<string, unknown>

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
              onBlur: (event: Event) => {
                const email = (event.target as HTMLInputElement).value;
                this.validateField('errorMail', email, checkEmailValidaty);
              },
              onChange: (event: Event) => {
                const email = (event.target as HTMLInputElement).value;
      
                this.setProps({
                  formData: {
                    ...this.props.formData,
                    email: email,
                  },
                });
      
                this.validateField('errorMail', email, checkEmailValidaty);
              },
          }),
          loginInput: new Input({
              name: "login",
              text: "Логин",
              required: true,
              validationType: "login",
              className: "input-type",
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
          firstNameInput: new Input({
              name: "first_name",
              text: "Имя",
              required: true,
              validationType: "name",
              className: "input-type",
              onBlur: (event: Event) => {
                const firstName = (event.target as HTMLInputElement).value;
                this.validateField('errorFirstName', firstName, checkNameValidaty);
              },
              onChange: (event: Event) => {
                const firstName = (event.target as HTMLInputElement).value;
      
                this.setProps({
                  formData: {
                    ...this.props.formData,
                    firstName: firstName,
                  },
                });
      
                this.validateField('errorFirstName', firstName, checkNameValidaty);
              },
          }),
          secondNameInput: new Input({
              name: "second_name",
              text: "Фамилия",
              validationType: "name",
              className: "input-type",
              onBlur: (event: Event) => {
                const secondName = (event.target as HTMLInputElement).value;
                this.validateField('errorFirstName', secondName, checkNameValidaty);
              },
              onChange: (event: Event) => {
                const secondName = (event.target as HTMLInputElement).value;
      
                this.setProps({
                  formData: {
                    ...this.props.formData,
                    secondName: secondName,
                  },
                });
      
                this.validateField('errorFirstName', secondName, checkNameValidaty);
              },
          }),
          phoneInput: new Input({
              name: "phone",
              text: "Телефон",
              type: "tel",
              validationType: "phone",
              className: "input-type",
              required: true,
              onBlur: (event: Event) => {
                const phone = (event.target as HTMLInputElement).value;
                this.validateField('errorPhone', phone, checkPhoneValidaty);
              },
              onChange: (event: Event) => {
                const phone = (event.target as HTMLInputElement).value;
      
                this.setProps({
                  formData: {
                    ...this.props.formData,
                    phone: phone,
                  },
                });
      
                this.validateField('errorPhone', phone, checkPhoneValidaty);
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
              label: "Зарегистрироваться",
              type: "submit",
              onClick: (event: Event) => {
                event.preventDefault();
      
                this.validateField('errorLogin', this.props.formData.login, checkLoginValidaty);
                this.validateField('errorFirstName', this.props.formData.firstName, checkNameValidaty);
                this.validateField('errorPassword', this.props.formData.password, checkPasswordValidaty);
                this.validateField('errorMail', this.props.formData.email, checkEmailValidaty);
                this.validateField('errorSecondName', this.props.formData.secondName, checkNameValidaty);
                this.validateField('errorPhone', this.props.formData.phone, checkPhoneValidaty);
                console.log(this.props.formData); // eslint-disable-line no-console
              }
          }),
          link: new Link({
              href: "/",
              text: "Войти"
          }),
          errorFirstName: '',
          errorMail: '',
          errorLogin: '',
          errorPassword: '',
          errorSecondName: '',
          errorPhone: '',
          formData: {
            email: '',
            login: '',
            password: '',
            firstName: '',
            secondName: '',
            phone: ''
          },
      })
  };

  validateField(field: string, value: string, validator: (value: string) => { errorMessage: string | null }): void {
    this.setProps({
      [field]: validator(value).errorMessage ?? '',
    });
  }

  override render(): string { 
    return registrationHtml;
  }
}
