import "./passwordEdit.css";
import passwordEditHtml from "./passwordEdit.tmpl";
import { Block } from "../../utils/block";
import { formValidation, validationRules} from "../../utils/formValidation/formValidation";
import UserPasswordController from "../../controller/userPasswordController";
import Form from "../../components/form/form";

const userPasswordController = new UserPasswordController();
const validate = formValidation(validationRules);

const inputGroupList: InputGroupSettings[] = [
    {
        text: 'Старый пароль',
        type: 'password',
        name: 'oldPassword',
        placeholder: 'Введите пароль',
        onBlur: () => {},
        onChange: () => {},
        value: '',
        error: ''
    },
    {
        text: 'Новый пароль',
        type: 'password',
        name: 'newPassword',
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

export class PasswordEdit extends Block {
  constructor() {
      super({
          Form: new Form({
              header: 'Изменить пароль',
              showButton: true,
              validate,
              inputGroupList,
              btnTitle: 'Сохранить',
              controller: userPasswordController,
              linkTitle: 'Назад',
              link: '/profile',
          })
      })
  }

  public render(): string {
    return passwordEditHtml;
  }
}
