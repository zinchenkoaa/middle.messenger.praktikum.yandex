import { Block } from "../../utils/block";
import inputHtml from "./input.tmpl"
import "./input.css";
import type { Props } from "../../types";

interface InputProps extends Props {
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
  }
  
  export class Input extends Block {
    constructor(props: InputProps) {
      super(props);
    }
  
    override render(): string {


      return inputHtml;
    }
}
