import "./search.css";
import linkHtml from "./search.tmpl"
import type { Props } from "../../types";
import { Block } from "../../utils/block";

export class Search extends Block<Props> {
    render(): string {
      return linkHtml; 
    }
}
