import { Block } from "../../utils/block";
import inputHtml from "./input.tmpl";
import "./input.css";

  export class Input extends Block {
    constructor(props: InputSettings) {
      super({
          ...props,
            inputClass: props.inputClass || 'input-type',
            events: {
                blur: (e :Event) => props.onBlur && props.onBlur(e),
                change: (e :Event) => props.onChange && props.onChange(e),
                keyup: (e :Event) => props.onEnter && props.onEnter(e),
                input: (e :Event) => props.onInput && props.onInput(e)
            },
      });
    }

      public get element(): HTMLInputElement {
          return this.getContent().querySelector('input') as HTMLInputElement;
      }

    public render(): string {
      return inputHtml;
    }
}
