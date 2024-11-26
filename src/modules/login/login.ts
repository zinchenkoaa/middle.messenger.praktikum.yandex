import { Block } from "../../utils/block";
import loginTmpl from "./login.tmpl";
import UserLoginController from '../../controller/userLoginController';
import Form from "../../components/form/form";
import {formValidationNew, validationRules} from "../../utils/formValidation";

const userLoginController = new UserLoginController();

const inputGroupList: InputGroupSettings[] = [
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
        text: 'Пароль',
        type: 'password',
        name: 'password',
        placeholder: 'Введите пароль',
        onBlur: () => {},
        onChange: () => {},
        value: '',
        error: ''
    },
];

const validate = formValidationNew(validationRules);

export class Login extends Block {
  constructor() {
    super({
        Form: new Form({
            header: "Вход",
            inputGroupList,
            btnTitle: 'Авторизоваться',
            validate,
            showButton: true,
            linkTitle: 'Нет аккаунта?',
            link: '/registration',
            controller: userLoginController
        })
    })
  }

  public render(): string {
    return loginTmpl;
  }
}
