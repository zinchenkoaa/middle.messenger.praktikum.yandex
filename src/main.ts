import { Login } from "./modules/login";
import { Registration } from "./modules/registration";
import { Err } from "./pages/error";
import { ProfileView } from "./modules/profileView";
import { ProfileEdit } from "./modules/profileEdit";
import { PasswordEdit } from "./modules/passwordEdit";
import { Chat } from "./pages/chat";

export default class Main {
    private appElement: HTMLElement;

    constructor() {
        this.appElement = document.getElementById('root') as HTMLElement;
    }

    render(): void {
        let inner: any;

        switch (document.location.pathname) {
            case "/":
                inner = new Login().getContent()
                break;

            case "/registration":
                inner = new Registration().getContent();
                break;

            case "/profile":
                inner = new ProfileView().getContent();
                break;

            case "/profile-edit":
                inner = new ProfileEdit().getContent();
                break;

            case "/password-edit":
                inner = new PasswordEdit().getContent();
                break;

            case "/chat":
                inner =  new Chat().getContent();
                break;

            case "/500":
                inner = new Err({ errorCode: "500", errorText: "Мы уже фиксим" }).getContent();
                break;

            default:
                inner = new Err({ errorCode: "400", errorText: "Страница не найдена" }).getContent()
        }


        this.appElement.replaceChildren(inner)
    }
}
