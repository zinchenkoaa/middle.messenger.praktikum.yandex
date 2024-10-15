import "./time.css";
import timeHtml from "./time.tmpl"
import type { Props } from "../../types";
import { Block } from "../../utils/block";

interface TimeProps extends Props {
    className?: string;
    time: string;
}

export class Time extends Block {
    constructor(props: TimeProps) {
        super(props);
    }

    render(): string {
        return timeHtml;
    }
}
