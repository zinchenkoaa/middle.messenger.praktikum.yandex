import "./avatar.css";
import avatarHtml from "./avatar.tmpl";
import { Block } from "../../utils/block";
import UserProfileController from "../../controller/userProfileController";
import connect from "../../utils/store/connect";
const userProfileController = new UserProfileController();

class Avatar extends Block {
    constructor(props: Indexed) {
        super({...props, events: {
                click: () => this.triggerFileInput(),
                change: (event: Event) => this.handleFileChange(event)
            }})
    }

    protected triggerFileInput = (): void  =>{
        const fileInput = this.element?.querySelector('input[type="file"]');
        if (fileInput) {
            (fileInput as HTMLInputElement).click(); // Открываем окно выбора файла
        }
    }

    protected handleFileChange = async(event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input && input.files) {
            const file = input.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('avatar', file)
                console.log( Object.fromEntries(formData))
                userProfileController.updateAvatar(formData)
            }

        }}

    render(): string {
        return avatarHtml;
    }
}

function mapProfilePhotoToProps(state: State):Indexed {
    return {
        ...state.auth.user
    };
}

export default connect(Avatar, mapProfilePhotoToProps);
