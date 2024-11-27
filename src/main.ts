import { Login } from "./modules/login";
import { Registration } from "./modules/registration";
import { Err } from "./pages/error";
import { PasswordEdit } from "./modules/passwordEdit";
import Router from "./route/Router";
import store, {StoreEvents} from "./utils/store/store";
import AuthApi from "./api/auth";
import Settings from "./pages/settings/settings";
import Chat from "./pages/chat/chat";
import ProfileEdit from "./modules/profileEdit/profileEdit";

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
                        console.log('store', store.getState())
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
                        console.log('store', store.getState())
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
            .use('/settings', Settings)
            .use('/profile-edit', ProfileEdit)
            .use('/password-edit', PasswordEdit)
            .use('/messenger', Chat,  requireAuth('/'))
            .use('/500', Err)
            .use('*', Err).start();
        return ''
    }
}
