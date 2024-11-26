import "./messageInput.css";
import send from "../../static/send.svg";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import messageInputHtml from "./messageInput.tmpl";
import { Block } from "../../utils/block";
import {formValidationNew, validationRules} from "../../utils/formValidation";

const createOnEnterHandler = (
    controller: MessageControllerInterface,
    getMessage: () => string
) => (e: KeyboardEvent): void => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter') {
        const message = getMessage();
        const validate = formValidationNew(validationRules);
        const error = validate('message', message);
        if (error) {
            alert(error);
        } else {
            controller.send(message);
            target.value = ''; // Очистка поля после отправки
        }
    }
}

export class MessageInput extends Block {
    private controller: MessageControllerInterface;

    constructor(props: Indexed) {
        const controller = props.controller as MessageControllerInterface;
        const getMessage = () => {
            const inputElement = this.children.input.element as HTMLInputElement;
            return inputElement ? inputElement.value : '';
        };

        super({
            ...props,
            input: new Input({
                type: "text",
                name: "message",
                inputClass: "message-field",
                placeholder: "Введите сообщение...",
                onEnter: createOnEnterHandler(controller, getMessage),
            }),
            sendButton: new Button({
                className: "send-btn",
                label: `<img src="${send}" />`,
                onClick: () => this.handleSendMessage(),
            }),
        });
        this.controller = controller;
    }

    private handleSendMessage(): void {
        const inputElement = this.children.input.element as HTMLInputElement;

        console.log('inputElement', inputElement.value);

        const message = inputElement ? inputElement.value : '';

        const validate = formValidationNew(validationRules);
        const error = validate('message', message);

        if (error) {
            alert(error);
        } else {
            this.controller.send(message);
            inputElement.value = '';
        }
    }

    public render(): string {
        return messageInputHtml
    }
}
