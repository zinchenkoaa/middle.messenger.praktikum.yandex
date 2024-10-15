import "./search.css";
import linkHtml from "./search.tmpl"
import type { Props } from "../../types";
import { Block } from "../../utils/block";

interface SearchProps extends Props {
    placeholder: string;
}

export class Search extends Block {
    constructor(props: SearchProps) {
        super(props);
    }

    render(): string {
      return linkHtml; 
    }
}
