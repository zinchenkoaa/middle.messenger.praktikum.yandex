import registrationHtml from "./registration.tmpl";
import { Block } from "../../utils/block";
import UserRegistrationController from '../../controller/userRegistrationController';
import Form from "../../components/form/form";
import {formValidation, validationRules} from "../../utils/formValidation";

const userRegistrationController = new UserRegistrationController();
const validate = formValidation(validationRules);

const inputGroupList: InputGroupSettings[] = [
    {
        text: 'Почта',
        type: 'text',
        name: 'email',
        placeholder: 'Введите email',
        onBlur: () => {},
        onChange: () => {},
        value: '',
        error: ''
    },
    {
        text: 'Логин',
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин',
        onBlur: () => {},
        onChange: () => {},
        value: '',
        error: ''
    },
    {
        text: 'Имя',
        type: 'text',
        name: 'first_name',
        placeholder: 'Введите имя',
        onBlur: () => {},
        onChange: () => {},
        value: '',
        error: ''
    },
    {
        text: 'Фамилия',
        type: 'text',
        name: 'second_name',
        placeholder: 'Введите фамилию',
        onBlur: () => {},
        onChange: () => {},
        value: '',
        error: ''
    },
    {
        text: 'Телефон',
        type: 'tel',
        name: 'phone',
        placeholder: 'Введите телефон',
        onBlur: () => {},
        onChange: () => {},
        value: '',
        error: ''
    },
    {
        text: 'Пароль',
        type: 'password',
        name: 'password',
        placeholder: 'Введите пароль',
        onBlur: () => {},
        onChange: () => {},
        value: '',
        error: ''
    },
    {
        text: 'Повторите пароль',
        type: 'password',
        name: 'password_check',
        placeholder: 'Введите пароль',
        onBlur: () => {},
        onChange: () => {},
        value: '',
        error: ''
    }
];

export class Registration extends Block {
  constructor() {
      super({
          Form: new Form({
              header: "Регистрация",
              validate,
              inputGroupList,
              showButton: true,
              controller: userRegistrationController,
              btnTitle: 'Зарегистрироваться',
              linkTitle: 'Войти',
              link: '/',
          })
      })
  };

  public render(): string {
    return registrationHtml;
  }
}
