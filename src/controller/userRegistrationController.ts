import Router from "../route/Router";
import AuthApi from "../api/auth";
import store from "../utils/store/store";

const router = new Router('#root');
const authApi = new AuthApi();

export default class UserRegistrationController implements FormController {
    public async registration(data: Indexed) {
        console.log('dataaa', data)
        try {
            const signupResponse = await authApi.create(data);
            if(signupResponse.response === 'OK') {
                console.log('Signup successful');
                const userResponse = await authApi.getUser();
                store.set('auth.user', userResponse.response);
                console.log(store.getState('auth.user'));
                router.go('/chat');
            }
        } catch (error) {
            console.log(error);
        }

    }

    public onSubmit(data: any) {
        this.registration(data);
    }
}
