import UserApi from "../api/user";
import AuthApi from "../api/auth";
import store from "../utils/store/store";

const userApi = new UserApi();
const authApi = new AuthApi();

export default class UserProfileController implements FormController {
    public async updateUser(data: Indexed) {
        try {
            const updateUserResponse = await userApi.updateUser({...data });
            console.log(updateUserResponse.response)
        } catch (error) {
            console.log(error);
        }
    }

    public async updateAvatar(data: FormData) {
        try {
            const updateAvatarResponse = await userApi.updateAvatar(data)
            if (updateAvatarResponse.status === 200) {
                const user = await authApi.getUser();
                store.set('auth.user', JSON.parse(user.response))
                console.log(store.getState())
            }
        } catch (error) {
            console.log(error);
        }
    }



    public onSubmit(data: Indexed) {
        this.updateUser(data);
    }
}
