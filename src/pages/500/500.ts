import {Block} from "../../utils/block";
import {Err} from "../error";

export default class Page500 extends Block {
    constructor() {
        super({
            error: new Err({ errorCode: "400", errorText: "Страница не найдена" }),
        });
    }

    public render(): string {
        return `
{{{error}}}
    `;
    }
}
