import "./profileView.css";
import profileViewHtml from "./profileView.tmpl"
import { Block } from "../../utils/block";
import {Link} from "../../components/link";
import Router from "../../route/Router";
import UserLoginController from "../../controller/userLoginController";
import connect from "../../utils/store/connect";
import Form from "../../components/form/form";
import {formValidation, validationRules} from "../../utils/formValidation";

const userLoginController = new UserLoginController();
const validate = formValidation(validationRules);
const router = new Router('#root');

function mapStateToProps(state: Indexed): Indexed {
    const user = (state as State).auth.user != null ? (state as State).auth.user : {};

    const inputGroupList: InputGroupSettings[] = [
        {
            text: 'Имя в сети',
            type: 'text',
            name: 'display_name',
            placeholder: 'Введите имя в сети',
            onBlur: () => {},
            onChange: () => {},
            disabled: true,
            value: user != null && user.display_name || '',
            error: ''
        },
        {
            text: 'Почта',
            type: 'text',
            name: 'email',
            placeholder: 'Введите email',
            onBlur: () => {},
            onChange: () => {},
            disabled: true,
            value: user != null && user.email || '',
            error: ''
        },
        {
            text: 'Логин',
            type: 'text',
            name: 'login',
            placeholder: 'Введите логин',
            onBlur: () => {},
            onChange: () => {},
            disabled: true,
            value: user != null && user.login || '',
            error: ''
        },
        {
            text: 'Имя',
            type: 'text',
            name: 'first_name',
            placeholder: 'Введите имя',
            onBlur: () => {},
            onChange: () => {},
            disabled: true,
            value: user != null && user.first_name || '',
            error: ''
        },
        {
            text: 'Фамилия',
            type: 'text',
            name: 'second_name',
            placeholder: 'Введите фамилию',
            onBlur: () => {},
            onChange: () => {},
            disabled: true,
            value: user != null && user.second_name || '',
            error: ''
        },
        {
            text: 'Телефон',
            type: 'tel',
            name: 'phone',
            placeholder: 'Введите телефон',
            disabled: true,
            onBlur: () => {},
            onChange: () => {},
            value: user != null && user.phone || '',
            error: ''
        },
    ];
    return { inputGroupList }
}
const connectedForm = connect(Form, mapStateToProps);

export class ProfileView extends Block {
  constructor() {
    super({
        Form: new connectedForm({
            header: "Данные профиля",
            validate,
            showButton: false,
            linkProfileEdit: new Link({
                text: 'Изменить данные',
                onClick: () => router.go('/profile-edit'),
            }),
            linkPasswordEdit: new Link({
                text: 'Изменить пароль',
                onClick: () => router.go('/password-edit'),
            }),
            linkLogout: new Link({
                text: 'Выйти',
                onClick: () => userLoginController.logout(),
            }),
        }),

    })
  }

  public render(): string {
    return profileViewHtml;
  }
}
