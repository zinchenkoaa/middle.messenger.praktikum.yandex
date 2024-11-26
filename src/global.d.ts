interface ValidationRule {
    validate: (value: string) => boolean;
    message: string;
}
interface ValidationRules {
    [field: string]: ValidationRule[];
}
type InputSettings = {
    type: string,
    name: string,
    text?: string,
    placeholder?: string,
    value?: string;
    error?: string
    onBlur?: (e:Event) => void;
    onChange?: (e:Event) => void;
    onEnter?: (e:Event) => void;
    onInput?: (e:Event) => void;
    inputClass?: string,
    disabled?: boolean,
}

type InputGroupSettings = InputSettings & {
    text: string,
    error: string | null;
}
type ButtonSettings = {
    label: string,
    type?: string,
    className?: string,
    onClick?: (e:Event) => void;
}
interface FormField {
    value: string | number;
    validationRules: ValidationRule[];
    error: string | null;
}
interface FormState {
    [key: string]: FormField;
}


type ChatItemSettings = {
    id: number,
    created_by: number,
    last_message: string | null,
    title: string,
    avatar: string | null,
    unreaded_count: number,
    currentChatId: null | number,
    onClick?: (e:Event) => void
}

type IconButtonSettings = {
    img_src: string,
    alt: string,
    onClick?: (e:Event) => void;
}
type MessageSettings = {
    type: string,
    text: string,
    time: string
}

type Indexed<T = unknown> = {
    [key in string]: T;
};

interface FormController {
    onSubmit(data?: Indexed): void;
}

interface LoginFormModel {
    email: string;
    password: string;
}

interface Modal {
    modalName: string,
    btnName: string,
    title: string,
    controller: FormController,
    inputHidden?: boolean
}

interface MessageControllerInterface {
    send: (message: string) => void
}

interface Message {
    chat_id: number,
    time: string,
    type: string,
    user_id: number,
    content: string,
    file?: Indexed,
    isSender?: boolean
}

interface User {
    display_name?: string;
    email?: string;
    login?: string;
    first_name?: string;
    second_name?: string;
    phone?: string;
    avatar?: string;
}

// interface State extends Indexed {
//   auth?: {
//     user?: User;
//   };
// }
interface State  extends Indexed {
    auth: {
        user: User | null
    },
    chats: Indexed[],
    chatUsers: Indexed[],
    messages: Indexed[],
    currentChat: Indexed,
    ui: {
        currentChatId: number | null,
        modalActive: {
            name: string,
            value: string
        }
    }
}
