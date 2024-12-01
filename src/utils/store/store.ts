import {get, set} from "../utils";
import {EventBus} from "../eventBus";

export enum StoreEvents {
    Updated = 'updated',
}

const initState = {
    auth: {
        user: null
    },
    chats: [],
    messages: [],
    currentChat: {},
    chatUsers: [],
    ui: {
        currentChatId: null,
        modalActive: {
            name: '',
            value: ''
        }
    }
}

class Store extends EventBus {
    protected state;

    constructor() {
        super();
        this.state = initState;
    }

    public getState(path: string = '') {
        return get(this.state, path);
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    };
}

export default new Store();
