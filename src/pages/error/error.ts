import "./error.css";
import errorHtml from "./error.tmpl";
import { Block } from "../../utils/block";

interface ErrorProps {
    errorCode: string;
    errorText: string;
}

export class Err extends Block<ErrorProps> {
    constructor(props: ErrorProps) {
        super(props)
    }

     render(): string {
        return errorHtml
     }
}
