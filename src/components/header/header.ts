import headerHtml from "./header.tmpl";
import type { Props } from "../../types";
import { Block } from "../../utils/block";
import "./header.css";

interface HeaderProps extends Props {
  title: string;
}

export class Header extends Block {
  constructor(props: HeaderProps) {
    super(props)
  }

  override render(): string {
    return headerHtml;
  }
}
