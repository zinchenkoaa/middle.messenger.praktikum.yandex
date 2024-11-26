import { Login } from "./modules/login";
import { Registration } from "./modules/registration";
import { Err } from "./pages/error";
import { ProfileView } from "./modules/profileView";
import { ProfileEdit } from "./modules/profileEdit";
import { PasswordEdit } from "./modules/passwordEdit";
import { Chat } from "./pages/chat";
import Router from "./route/Router";
import store, {StoreEvents} from "./utils/store/store";
import AuthApi from "./api/auth";

export default class Main {
    private router;

    constructor() {
        this.router = new Router('#root');
        this.setupRoutes();
        store.on(StoreEvents.Updated, () => {});
    }

    setupRoutes(): void {
        const requireLogin = (goTo: string ) => async () => {
            const userStore = store.getState('auth.user');
            if (!userStore) {
                try {
                    const authApi = new AuthApi();
                    const userResponse = await authApi.getUser();
                    if (userResponse.status === 200) {
                        console.log('store', store.getState())
                        store.set('auth.user', JSON.parse(userResponse.response));
                        this.router.go(goTo);
                        return false;
                    }
                } catch (error) {
                    console.log('Ошибка авторизации', error)
                }
                return true;
            }
            this.router.go(goTo);
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
                this.router.go(goTo);
                return false;
            }

            return true;
        };



        this.router
            .use('/', Login, requireLogin('/chat'))
            .use('/registration', Registration)
            .use('/profile', ProfileView, requireAuth('/'))
            .use('/profile-edit', ProfileEdit)
            .use('/password-edit', PasswordEdit)
            .use('/chat', Chat)
            .use('/500', Err)
            .use('*', Err).start();
    }
}
