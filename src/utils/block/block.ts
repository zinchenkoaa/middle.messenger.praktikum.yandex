import { EventBus } from "../eventBus";
import { v4 as makeUUID } from "uuid";
import Handlebars from 'handlebars';

interface BlockEvents {
  [key: string]: EventListenerOrEventListenerObject;
}

interface BlockAttributes {
  [key: string]: string;
}

interface BlockProps {
  events?: BlockEvents;
  attr?: BlockAttributes;
  __id?: string;
}

export abstract class Block<P extends Record<string, unknown> = {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  protected _element: HTMLElement | null = null;

  protected _id: string = makeUUID();

  protected props: P & BlockProps;

  protected children: Record<string, Block<Record<string, unknown>>>;

  protected lists: Record<string, unknown[]>;

  protected eventBus: () => EventBus;

  constructor(propsWithChildren: P & BlockProps = {} as P & BlockProps) {
    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props, __id: this._id }) as P & BlockProps;
    this.children = children;
    this.lists = this._makePropsProxy({ ...lists });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: P & BlockProps, newProps: P & BlockProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: P & BlockProps, newProps: P & BlockProps): boolean {
    if (oldProps !== newProps) {
      return true;
    } else {
      return true;
    }
  }

  private _getChildrenPropsAndProps(
    propsAndChildren: P & BlockProps
  ): {
    children: Record<string, Block<Record<string, unknown>>>;
    props: P & BlockProps;
    lists: Record<string, unknown[]>;
  } {
    const children: Record<string, Block<Record<string, unknown>>> = {};
    const props: Record<string, unknown> = {};
    const lists: Record<string, unknown[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value; 
      }
    });

    return { children, props: props as P & BlockProps, lists };
  }

  protected addAttributes(): void {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value);
      }
    });
  }

  public setProps = (nextProps: Partial<P & BlockProps>): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public setLists = (nextList: Record<string, unknown[]>): void => {
    if (!nextList) {
      return;
    }

    Object.assign(this.lists, nextList);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    this._removeEvents();
    const propsAndStubs: Record<string, unknown> = { ...this.props };
    const tmpId = makeUUID();

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, childList]) => {
      const listCont = this._createDocumentElement('template');
      (childList as unknown[]).forEach(item => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  protected render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

  private _makePropsProxy<T extends object>(props: T): T {
    const self = this;

    return new Proxy(props, {
      get(target: T, prop: string | symbol) {
        const value = target[prop as keyof T];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: T, prop: string | symbol, value: unknown) {
        const oldTarget = { ...target };
        target[prop as keyof T] = value as T[keyof T];
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', `${this._id}`);
    return element as HTMLTemplateElement;
  }

  public show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }

  private _addEvents(): void {
    const events = this.props.events ?? {};
    Object.entries(events).forEach(([eventName, handler]) => {
      if (this._element) {
        this._element.addEventListener(eventName, handler);
      }
    });
  }

  private _removeEvents(): void {
    const events = this.props.events ?? {};
    Object.entries(events).forEach(([eventName, handler]) => {
      if (this._element) {
        this._element.removeEventListener(eventName, handler);
      }
    });
  }
}
