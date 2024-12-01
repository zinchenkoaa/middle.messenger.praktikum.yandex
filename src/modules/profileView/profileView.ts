import "./profileView.css";
import { Block } from "../../utils/block";
import {Link} from "../../components/link";
import Router from "../../route/Router";
import UserLoginController from "../../controller/userLoginController";
import connect from "../../utils/store/connect";
import ProfilePhoto from "../../components/profilePhoto/profilePhoto";

const userLoginController = new UserLoginController();
const router = new Router('#root');

const joinImagePath = (img?: string) => {
    if (!img) {
        return undefined;
    }

    const baseURL = 'https://ya-praktikum.tech/api/v2';
    const resourcePath = 'resources';

    return [
        baseURL.replace(/\/+$/, ''),         // Убираем / в конце baseURL
        resourcePath.replace(/^\/+|\/+$/, ''), // Убираем / в начале и в конце resourcePath
        img.replace(/^\/+/, '')             // Убираем / в начале img
    ].join('/');
};

class ProfileView extends Block {
  constructor(props:Indexed) {
    super({
        ...props,
        header: "Данные профиля",
        ProfilePhoto: new ProfilePhoto({
            avatar: props.avatar,
            img_src: joinImagePath(props.avatar as string)
        }),
        ButtonChangeData: new Link({
            text: 'Изменить данные',
            onClick: () => {
                router.go('/profile-edit')
            },
        }),
        ButtonChangePassword: new Link({
            text: 'Изменить пароль',
            onClick: () => {
                router.go('/password-edit')
            },
        }),
        ButtonBack: new Link({
            text: 'Назад',
            onClick: () => {
                router.go('/messenger')
            }
        }),
        IconLogout: new Link({
            text: 'Выйти',
            onClick: () => {
                userLoginController.logout()
            },
        }),
        })
  }

  public render(): string {
    return `
      <div class="side-panel">
        {{{ProfilePhoto }}}
        <div class="profile-info">
              <div class="profile-info-item">
                <div class="profile-info-data">
                  <span class="profile-info-subtitle">Никнейм:</span>
                  <span class="profile-info-title">{{display_name}}</span>
                </div>
              </div>
               <div class="profile-info-item">
                <div class="profile-info-data">
                  <span class="profile-info-subtitle">Логин:</span>
                  <span class="profile-info-title">{{login}}</span>
                </div>
              </div>
              <div class="profile-info-item">
                <div class="profile-info-data">
                  <span class="profile-info-subtitle">Имя:</span>
                  <span class="profile-info-title">{{first_name}}</span>
                </div>
              </div>
              </div>
              <div class="profile-info-item">
                <div class="profile-info-data">
                  <span class="profile-info-subtitle">Фамилия:</span>
                  <span class="profile-info-title">{{second_name}}</span>
                </div>
              </div>
              <div class="profile-info-item">
                <div class="profile-info-data">
                  <span class="profile-info-subtitle">Телефон:</span>
                  <span class="profile-info-title">{{phone}}</span>
                </div>
              </div>
              <div class="profile-info-item">
                <div class="profile-info-data">
                  <span class="profile-info-subtitle">Почта:</span>
                  <span class="profile-info-title">{{email}}</span>
                </div>
              </div>

              <div class="profile-btn btn-group-2">
                {{{ButtonChangeData}}}
                {{{ButtonChangePassword}}}
                {{{ButtonBack}}}
                {{{IconLogout}}}
              </div>
          </div>
      </div>`;
  }
}

function mapUserToProps(state:State) {
    return {
        ...state.auth.user
    };
}

export default connect(ProfileView, mapUserToProps);
