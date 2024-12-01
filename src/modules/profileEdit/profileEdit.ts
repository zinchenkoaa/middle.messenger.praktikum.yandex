import "./profileEdit.css";
import profileEditHtml from "./profileEdit.tmpl";
import { Block } from "../../utils/block";
import {
    formValidation, validationRules
} from "../../utils/formValidation/formValidation";
import connect from "../../utils/store/connect";
import Form from "../../components/form/form";
import UserProfileController from "../../controller/userProfileController";
import Avatar from "../../components/avatar/avatar";
import Router from "../../route/Router";

const validate = formValidation(validationRules);
const userProfileController = new UserProfileController();

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
            value: user != null && user.second_name || '',
            error: ''
        },
        {
            text: 'Телефон',
            type: 'tel',
            name: 'phone',
            placeholder: 'Введите телефон',
            onBlur: () => {},
            onChange: () => {},
            value: user != null && user.phone || '',
            error: ''
        },
    ];
    return { inputGroupList }
}
const connectedForm = connect(Form, mapStateToProps);

export default class ProfileEdit extends Block {
    constructor() {
        super({
            Form: new connectedForm({
                inputGroupList: [],
                header: 'Изменение данных',
                validate,
                btnTitle: 'Сохранить',
                linkTitle: 'Назад',
                link: '/settings',
                onClickLink: (e: any) => {
                    e.preventDefault();
                    router.back()
                },
                showButton: true,
                controller: userProfileController,
                avatar: new Avatar({}),
            }),
        })
    }

    public  render(): string {
        return profileEditHtml;
    }
}
