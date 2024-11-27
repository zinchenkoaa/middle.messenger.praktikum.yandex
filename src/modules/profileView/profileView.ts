import "./profileView.css";
import { Block } from "../../utils/block";
import {Link} from "../../components/link";
import Router from "../../route/Router";
import UserLoginController from "../../controller/userLoginController";
import connect from "../../utils/store/connect";
import Avatar from "../../components/avatar/avatar";

const userLoginController = new UserLoginController();
const router = new Router('#root');

const joinImagePath = (img:string) => (['https://ya-praktikum.tech/api/v2', 'resources', img].join('/'));

class ProfileView extends Block {
  constructor(props:Indexed) {
    super({
        ...props,
        header: "Данные профиля",
        ProfilePhoto: new Avatar({
            img_src: joinImagePath(props.avatar as string)
        }),
            ButtonChangeData: new Link({
                text: 'Изменить данные',
                onClick: () => router.go('/profile-edit'),
            }),
            ButtonChangePassword: new Link({
                text: 'Изменить пароль',
                onClick: () => router.go('/password-edit'),
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
                  <span class="profile-info-subtitle">телефон</span>
                  <span class="profile-info-title">{{phone}}</span>
                </div>
              </div>
              <div class="profile-info-item">
                <div class="profile-info-data">
                  <span class="profile-info-subtitle">почта</span>
                  <span class="profile-info-title">{{email}}</span>
                </div>
              </div>
              <div class="profile-info-item">
                <div class="profile-info-data">
                  <span class="profile-info-subtitle">логин</span>
                  <span class="profile-info-title">{{login}}</span>
                </div>
              </div>
              <div class="profile-btn btn-group-2">
                {{{ButtonChangeData}}}
                {{{ButtonChangePassword}}}
                {{{IconLogout}}}
              </div>
          </div>
      </div>`;;
  }
}

function mapUserToProps(state:State) {
    console.log(state.auth.user)
    return {
        ...state.auth.user
    };
}

export default connect(ProfileView, mapUserToProps);
