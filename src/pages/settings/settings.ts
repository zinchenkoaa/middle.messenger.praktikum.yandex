import {Block} from "../../utils/block";
import ProfileView from "../../modules/profileView/profileView";
import "./settings.css";


export default class Settings extends Block {
    constructor() {
        super({
            ProfileView: new ProfileView({})
        })
    }

    public render(): string {
        return `
        <div class="setting-wrapper">
        {{{ProfileView}}}
        </div>
        `
    }
}
