import { Block } from "../utils/block";

interface Props {
    [key: string]: any;
}

type BlockConstructor = new () => Block;

function isEqual(lhs: string, rhs: string): boolean{
    return lhs === rhs;
}

function render(query: string, block: Block) {
    const root = document.querySelector(query);

    if (!root) {
        console.error('Root element not found for query:', query);
        return;
    }

    root.innerHTML = '';
    root.appendChild(block.getContent());
}

export default class Route {
    protected _pathname: string;

    protected _props: Props;

    protected _block: Block | null;

    protected _blockClass: BlockConstructor;

    constructor(pathname: string, view: BlockConstructor, props: Props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            const content = this._block.getContent();
            if (content && content.parentNode) {
                content.parentNode.removeChild(content); // Удаляем блок из DOM
            }
            this._block = null; // Убираем ссылку на блок
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
        }

        render(this._props.rootQuery, this._block); // Рендер нового компонента
    }

    getPathname() {
        return this._pathname;
    }
}

