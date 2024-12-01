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
                click: (e: MouseEvent) => {
                    this.handleClickOutside(e); // Закрытие при клике вне модального окна
                    this.handleCloseButtonClick(e); // Закрытие при клике на кнопку
                },
            }
        });
    }

    handleClickOutside(e: MouseEvent): void {
        const modalContainer = this.getContent().querySelector('.modal-container');
        if (modalContainer && !modalContainer.contains(e.target as Node)) {
            store.set('ui.modalActive.name', null);
        }
    }

    private handleCloseButtonClick(e: MouseEvent): void {
        const target = e.target as HTMLElement;
        if (target.classList.contains('modal-close')) {
            store.set('ui.modalActive.name', null); // Закрытие модалки
        }
    }

    public render(): string {
        const isActive = this.props.modalName === this.props.modalNameActive;
        const modalClass = isActive ? 'modal-area modal-open' : 'modal-area'
        return `<div class="${modalClass}">
              <div class="modal-container">
              <div class="close">

              <button class="modal-close">&times;</button>
</div>
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
