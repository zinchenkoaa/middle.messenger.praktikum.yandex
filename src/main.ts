import { Login } from "./modules/login";
import { Registration } from "./modules/registration";
import Router from "./route/Router";
import store, {StoreEvents} from "./utils/store/store";
import AuthApi from "./api/auth";
import Settings from "./pages/settings/settings";
import Chat from "./pages/chat/chat";
import ProfileEdit from "./modules/profileEdit/profileEdit";
import PasswordEdit from "./modules/passwordEdit/passwordEdit";
import Page404 from "./pages/404/404";
import Page500 from "./pages/500/500";

export default class Main {
    constructor() {
        store.on(StoreEvents.Updated, () => {});
    }

    render(): string {
        const requireLogin = (goTo: string ) => async () => {
            const userStore = store.getState('auth.user');
            if (!userStore) {
                try {
                    const authApi = new AuthApi();
                    const userResponse = await authApi.getUser();
                    if (userResponse.status === 200) {
                        store.set('auth.user', JSON.parse(userResponse.response));
                        router.go(goTo);
                        return false;
                    }
                } catch (error) {
                    console.log('Ошибка авторизации', error)
                }
                return true;
            }
            router.go(goTo);
            return false;
        };

        const requireAuth = (goTo: string ) => async () => {
            const userStore = store.getState('auth.user');
            if (!userStore) {
                try {
                    const authApi = new AuthApi();
                    const userResponse = await authApi.getUser();
                    if (userResponse.status === 200) {
                        store.set('auth.user', JSON.parse(userResponse.response));
                        return true;
                    }
                } catch (error) {
                    console.log('Ошибка авторизации', error)
                }
                router.go(goTo);
                return false;
            }

            return true;
        };


        const router = new Router('#root');
        router
            .use('/', Login, requireLogin('/messenger'))
            .use('/sign-up', Registration)
            .use('/settings', Settings, requireAuth('/'))
            .use('/profile-edit', ProfileEdit, requireAuth('/'))
            .use('/password-edit', PasswordEdit, requireAuth('/'))
            .use('/messenger', Chat,  requireAuth('/'))
            .use('/500', Page500)
            .use('/404', Page404).start();
        return ''
    }
}
