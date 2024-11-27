import "./error.css";
import errorHtml from "./error.tmpl";
import { Block } from "../../utils/block";

export class Err extends Block {
     render(): string {
        return errorHtml
     }
}
