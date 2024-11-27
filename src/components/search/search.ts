import "./search.css";
import linkHtml from "./search.tmpl"
import { Block } from "../../utils/block";

export class Search extends Block {
    render(): string {
      return linkHtml;
    }
}
