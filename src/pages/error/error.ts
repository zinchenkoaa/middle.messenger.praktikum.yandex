import "./error.css";
import errorHtml from "./error.tmpl";
import { Block } from "../../utils/block";

type ErrorProps = {
    errorCode: string;
    errorText: string;
} & Record<string, unknown>

export class Err extends Block<ErrorProps> {
     render(): string {
        return errorHtml
     }
}
