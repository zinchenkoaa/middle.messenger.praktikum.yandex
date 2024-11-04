import "./profileEdit.css";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import profileEditHtml from "./profileEdit.tmpl";
import { Block } from "../../utils/block";
import { Link } from "../../components/link";
import { Header } from "../../components/header/header";
import { Avatar } from "../../components/avatar";
import type { AllFormData } from "../../types";
import { checkEmailValidaty, checkLoginValidaty, checkNameValidaty, checkPhoneValidaty } from "../../utils/formValidation/formValidation";

type ProfileEditProps = {
    errorMail: string;
    errorLogin: string;
    errorSecondName: string;
    errorFirstName: string;
    errorPhone: string;
    errorDisplayName: string;
    formData: AllFormData;
} & Record<string, unknown>

export class ProfileEdit extends Block<ProfileEditProps> {
    constructor() {
        super({
            avatar: new Avatar({
                changeAva: true
            }),
            header: new Header({
              title: "Изменение данных"
            }),
            mailInput: new Input({
                name: "email",
                text: "Почта",
                required: true,
                value: "test@yandex.ru",
                className: "input-type",
                type: "email",
                validationType: "email",
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
                className: "input-type",
                value: "testtestovich",
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
            firstNameInput: new Input({
                name: "first_name",
                text: "Имя",
                required: true,
                value: "Тест",
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
                className: "input-type",
                validationType: "name",
                value: "Тестович",
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
                value: "+7 (999) 999 99 99",
                type: "tel",
                className: "input-type",
                validationType: "phone",
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
            displayNameInput: new Input({
                name: "display_name",
                text: "Имя в чате",
                value: "Тестович",
                className: "input-type",
                validationType: "display_name",
                required: true,
                onBlur: (event: Event) => {
                    const displayName = (event.target as HTMLInputElement).value;
                    this.validateField('errorDisplayName', displayName, checkNameValidaty);
                  },
                  onChange: (event: Event) => {
                    const displayName = (event.target as HTMLInputElement).value;
          
                    this.setProps({
                      formData: {
                        ...this.props.formData,
                        displayName: displayName,
                      },
                    });
          
                    this.validateField('errorDisplayName', displayName, checkNameValidaty);
                  },
            }),
            button: new Button({
                label: "Сохранить",
                type: "submit",
                onClick: (event: Event) => {
                    event.preventDefault();
        
                    this.validateField('errorLogin', this.props.formData.login, checkLoginValidaty);
                    this.validateField('errorFirstName', this.props.formData.firstName, checkNameValidaty);
                    this.validateField('errorDisplayName', this.props.formData.displayName, checkNameValidaty);
                    this.validateField('errorMail', this.props.formData.email, checkEmailValidaty);
                    this.validateField('errorSecondName', this.props.formData.secondName, checkNameValidaty);
                    this.validateField('errorPhone', this.props.formData.phone, checkPhoneValidaty);

                    console.log(this.props.formData); // eslint-disable-line no-console
                }
            }),
            link: new Link({
                href: "/profile",
                text: "Назад"
            }),
            errorMail: '',
            errorLogin: '',
            errorSecondName: '',
            errorFirstName: '',
            errorPhone: '',
            errorDisplayName: '',
            formData: {
              email: '',
              login: '',
              displayName: '',
              firstName: '',
              secondName: '',
              phone: ''
            },
        })
    }

    validateField(field: string, value: string, validator: (value: string) => { errorMessage: string | null }): void {
        this.setProps({
          [field]: validator(value).errorMessage ?? '',
        });
    }

    override  render(): string {
        return profileEditHtml;
    }
}
