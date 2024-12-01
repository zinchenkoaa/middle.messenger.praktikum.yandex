import { Block } from "../../utils/block";
import loginTmpl from "./login.tmpl";
import UserLoginController from '../../controller/userLoginController';
import Form from "../../components/form/form";
import {formValidation, validationRules} from "../../utils/formValidation";
import Router from "../../route/Router";

const userLoginController = new UserLoginController();

const router = new Router('#root');

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

const validate = formValidation(validationRules);

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
            onClickLink: () => router.go('/sign-up'),
            controller: userLoginController
        })
    })
  }

  public render(): string {
    return loginTmpl;
  }
}
