import {Block} from "../../utils/block";
import InputGroup from "../inputGroup/inputGroup";
import store from "../../utils/store/store";
import connect from "../../utils/store/connect";
import {Button} from "../button";
import "./modal.css";

class ModalAdd extends Block {
    constructor(props: Modal) {
        super({
            ...props,
            input: new InputGroup({
                text: '',
                type: 'text',
                value: '',
                error: '',
                placeholder: '',
                name: 'field',
                onChange: (e:Event) => {
                    const target = e.target as HTMLInputElement;
                    const { value } = target;
                    console.log(value);
                    store.set('ui.modalActive.value', value)
                    console.log(store.getState())
                }
            }),
            Button: new Button({
                label: props.btnName,
                onClick: () => {
                    props.controller.onSubmit();
                    store.set('ui.modalActive.name', null);
                }
            }),
        });
        this.setEvents();
    }

    private setEvents() {
        this.setProps({
            events: {
                click: this.handleClickOutside.bind(this),
            }
        });
    }

    handleClickOutside(e: MouseEvent): void {
        const modalContainer = this.getContent().querySelector('.modal-container');
        if (modalContainer && !modalContainer.contains(e.target as Node)) {
            store.set('ui.modalActive.name', null);
        }
    }

    public render(): string {
        const isActive = this.props.modalName === this.props.modalNameActive;
        const modalClass = isActive ? 'modal-area modal-open' : 'modal-area'
        return `<div class="${modalClass}">
              <div class="modal-container">
                  <h3>{{title}}</h1>
                  {{#unless inputHidden}}
                    {{{input}}}
                  {{/unless}}
                  {{{Button}}}
              </div>
            </div>`;
    }
}

function mapModalToProps(state: State):Indexed {
    return {
        modalNameActive: state.ui.modalActive.name
    };
}
export default connect(ModalAdd, mapModalToProps)
