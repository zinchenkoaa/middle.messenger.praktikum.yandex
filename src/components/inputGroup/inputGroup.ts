import {Input} from "../input";
import {Block} from "../../utils/block";
import "./inputGroup.css";

export default class InputGroup extends Block {
    constructor(props: InputSettings) {
        const inputChild = new Input({
            type: props.type,
            text: props.text,
            name: props.name,
            error: props.error,
            inputClass: props.inputClass,
            placeholder: props.placeholder,
            value: props.value,
            disabled: props.disabled,
            onBlur: props.onBlur,
            onChange: props.onChange
        });
        super({
            ...props,
            inputChild
        });
        console.log(props.value)
    }

    public render(): string {
        return `<div class="input-group">
              {{{inputChild}}}
              {{#if error}}
                <span class="input-group-error">{{error}}</span>
              {{/if}}
            </div>`
    }
}
