import UserApi from "../api/user";

const userApi = new UserApi();

export default class UserPasswordController implements FormController {
    public async updatePassword(data: Indexed) {
        try {
            const updateUserResponse = await userApi.updatePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
            console.log(updateUserResponse.response)
        } catch (error) {
            console.log(error);
        }
    }

    public onSubmit(data: Indexed) {
        this.updatePassword(data);
    }
}
