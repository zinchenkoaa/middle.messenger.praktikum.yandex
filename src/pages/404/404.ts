import {Block} from "../../utils/block";
import {Err} from "../error";


export default class Page404 extends Block {
    constructor() {
        super({
            error: new Err({
                errorCode: "500", errorText: "Мы уже фиксим"
            }),
        });
    }

    public render(): string {
        return `
          {{{error}}}
    `;
    }
}
