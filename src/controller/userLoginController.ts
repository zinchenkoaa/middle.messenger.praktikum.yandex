import Router from "../route/Router";
import AuthApi from "../api/auth";
import store from "../utils/store/store";

const router = new Router('#root');
const authApi = new AuthApi();

export default class UserLoginController implements FormController {
    public async login(data: any) {
        try {
            const loginResponse = await authApi.login(data);
            if (loginResponse.response === 'OK' || loginResponse.status === 200) {
                console.log('Login successful');
                // const userResponse = await userApi.getUser();
                // store.set('auth.user', userResponse.response);
                // console.log(store.getState('auth.user'));
                router.go('/messenger');
            }
            else {
                console.log('login failed', loginResponse)
            }
        } catch (error) {
            console.error('An error occurred during login or fetching user:', error);
        }
    }

    public async logout() {
        try {
            const logoutResponse = await authApi.logout();
            if (logoutResponse.response === 'OK') {
                store.set('auth', { user: null });
                router.go('/');
            }
            else {
                console.log('Пользователь уже покинул')
            }
        } catch (error) {
            console.log(error);
        }

    }

    public onSubmit(data: any) {
        this.login(data);
    }
}
