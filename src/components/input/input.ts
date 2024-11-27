import { Block } from "../../utils/block";
import inputHtml from "./input.tmpl";
import "./input.css";

type InputProps = {
    name?: string;
    text?: string;
    type?: string;
    className?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errorMessage?: string;
    validationType?: string;
    isProfile?: boolean;
    onBlur?: (e: Event) => void,
    onChange?: (e: Event) => void,
  } & Record<string, unknown>
  
  export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
      super({...props,       
        events: {
          blur: (e: Event) => {
            if (props.onBlur) { 
              props.onBlur(e);
            }
          },
          change: (e: Event) => {
            if (props.onChange) {
              props.onChange(e);
            }
          },
        },
      });
    }
  
    override render(): string {


      return inputHtml;
    }
}
