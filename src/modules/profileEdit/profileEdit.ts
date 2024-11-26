import "./profileEdit.css";
import profileEditHtml from "./profileEdit.tmpl";
import { Block } from "../../utils/block";
import { Avatar } from "../../components/avatar";
import {
    formValidation, validationRules
} from "../../utils/formValidation/formValidation";
import connect from "../../utils/store/connect";
import Form from "../../components/form/form";

const validate = formValidation(validationRules);

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

export class ProfileEdit extends Block {
    constructor() {
        super({
            Form: new connectedForm({
                header: 'Изменение данных',
                validate,
                btnTitle: 'Сохранить',
                linkTitle: 'Назад',
                link: '/profile',
                showButton: true,
                avatar: new Avatar({
                    changeAva: true
                }),
            }),
        })
    }

    public  render(): string {
        return profileEditHtml;
    }
}
