import "./passwordEdit.css";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import passwordEditHtml from "./passwordEdit.tmpl";
import { Block } from "../../utils/block";
import { Header } from "../../components/header/header";
import { Avatar } from "../../components/avatar";
import { Link } from "../../components/link";
import type { AllFormData } from "../../types";
import { checkPasswordValidaty } from "../../utils/formValidation/formValidation";

type PasswordEditProps = {
  errorOldPassword: string;
  errorNewPassword: string;
  errorRepeatPassword: string;
  formData: AllFormData
} & Record<string, unknown>

export class PasswordEdit extends Block<PasswordEditProps> {
  constructor() {
    super({
      avatar: new Avatar({}),
      header: new Header({
        title: "Изменить пароль"
      }),
      oldPassword: new Input({
        name: "oldPassword",
        text: "Старый пароль",
        type: "password",
        className: "input-type",
        validationType: "password",
        onBlur: (event: Event) => {
          const password = (event.target as HTMLInputElement).value;
          this.validateField('errorOldPassword', password, checkPasswordValidaty)
        },
        onChange: (event: Event) => {
          const password = (event.target as HTMLInputElement).value;

          this.setProps({
            formData: {
              ...this.props.formData,
              oldPassword: password,
            },
          });

          this.validateField('errorOldPassword', password, checkPasswordValidaty);
        },
      }),
      newPassword: new Input({
        name: "newPassword",
        text: "Новый пароль",
        type: "password",
        className: "input-type",
        validationType: "password",
        onBlur: (event: Event) => {
          const password = (event.target as HTMLInputElement).value;
          this.validateField('errorNewPassword', password, checkPasswordValidaty)
        },
        onChange: (event: Event) => {
          const password = (event.target as HTMLInputElement).value;

          this.setProps({
            formData: {
              ...this.props.formData,
              newPassword: password,
            },
          });

          this.validateField('errorNewPassword', password, checkPasswordValidaty);
        },
      }),
      repeatPassword: new Input({
        name: "repeatPassword",
        text: "Повторите новый пароль",
        type: "password",
        className: "input-type",
        validationType: "password",
        onBlur: (event: Event) => {
          const password = (event.target as HTMLInputElement).value;
          this.validatePasswordMatch(password);
        },
        onChange: (event: Event) => {
          const password = (event.target as HTMLInputElement).value;

          this.setProps({
            formData: {
              ...this.props.formData,
              repeatPassword: password,
            },
          });

          this.validatePasswordMatch(password);
        },
      }),
      button: new Button({
        label: "Сохранить",
        type: "submit",
          onClick: (event: Event) => {
          event.preventDefault();

          this.validateField('errorOldPassword', this.props.formData.oldPassword, checkPasswordValidaty);
          this.validateField('errorNewPassword', this.props.formData.newPassword, checkPasswordValidaty);
          this.validatePasswordMatch(this.props.formData.repeatPassword);

          console.log(this.props.formData); // eslint-disable-line no-console
      }
    }),
    link: new Link({
      href: "/profile",
      text: "Назад"
  }),
  errorOldPassword: '',
  errorNewPassword: '',
  errorRepeatPassword: '',
  formData: {
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  }
    })
  }

  validateField(field: string, value: string, validator: (value: string) => { errorMessage: string | null }): void {
    this.setProps({
      [field]: validator(value).errorMessage ?? '',
    });
  }

  validatePasswordMatch(repeatPassword: string): void {
    const { newPassword } = this.props.formData;

    if (repeatPassword.length === 0) {
      this.setProps({
        errorRepeatPassword: 'Пароль не введен',
      });
    } else if (repeatPassword !== newPassword) {
      this.setProps({
        errorRepeatPassword: 'Пароли не совпадают',
      });
    } else {
      this.setProps({
        errorRepeatPassword: '',
      });
    }
  }

  override render(): string {
    return passwordEditHtml;
  }
}
