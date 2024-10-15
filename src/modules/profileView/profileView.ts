import "./profileView.css";
import { Input } from "../../components/input";
import { Form } from "../../components/form";
import profileViewHtml from "./profileView.tmpl"
import { Block } from "../../utils/block";
import { Avatar } from "../../components/avatar";
import { Header } from "../../components/header/header";

export class ProfileView extends Block {
  constructor() {
    super({
      avatar: new Avatar({}),

     header: new Header({
        className: "home-header", title: "Данные профиля"
    }),
      mailInput: new Input({
          name: "email",
          text: "Почта",
          required: true,
          className: "input-type",
          value: "test@yandex.ru",
          type: "email",
          disabled: true,
      }),
      loginInput: new Input({
        name: "login",
        text: "Логин",
        className: "input-type",
        required: true,
        value: "testtestovich",
        disabled: true,
      }),
      secondNameInput: new Input({
        name: "second_name",
        className: "input-type",
        text: "Фамилия",
        value: "Тестович",
        disabled: true,
      }),
      phoneInput: new Input({
        name: "phone",
        text: "Телефон",
        className: "input-type",
        value: "+7 (999) 999 99 99",
        type: "tel",
        required: true,
        disabled: true,
      }),
      displayNameInput: new Input({
        name: "display_name",
        text: "Имя в чате",
        className: "input-type",
        value: "Тестович",
        required: true,
        disabled: true,
      }),
    })
  }

  override  render(): string {
    const form = new Form({
        name: "formProfileView",
        header: `{{{ header }}}`,
        body: profileViewHtml,
        settings: {
            withInternalID: true
        }
    });

    return form.render(); 
  }
}
