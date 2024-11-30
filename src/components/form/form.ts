import {Block} from "../../utils/block";
import store from "../../utils/store/store";
import connect from "../../utils/store/connect";
import {Button} from "../button";
import "./form.css";
import formTmpl from "./form.tmpl";
import InputGroup from "../inputGroup/inputGroup";
import {Link} from "../link";

type FormSettings = {
    header: string;
    title: string;
    btnTitle?: string;
    linkTitle?: string;
    link?: string;
    showButton?: boolean;
    inputGroupList: InputSettings[];
    validate: (name:string, value: string | number) => string | null;
    bgdForm?: string;
    btnStyle?: string;
    onClickLink: () => void;
    controller?: FormController
}

class Form extends Block {
    constructor(props: FormSettings) {
        const onChange = (e: Event): void => {
            const target = e.target as HTMLInputElement;
            const { name, value } = target;

            // Обновляем состояние в store
            store.set(name, value);
        };

        const onBlur = (e: Event): void => {
            const target = e.target as HTMLInputElement;
            const { name, value } = target;

            // Проверяем, существует ли поле в inputGroupList
            const index = props.inputGroupList.findIndex((prop) => prop.name === name);
            if (index !== -1) {
                // Выполняем валидацию
                const error = props.validate(name, value);
                this.props.inputGroupList[index].setProps({ error });
            }
        };

        const onSubmit = (e: Event): void => {
            e.preventDefault();

            const rootElement = this.getContent();
            const form = rootElement?.querySelector('form') as HTMLFormElement;

            if (!form || !(form instanceof HTMLFormElement)) {
                console.error("No valid form element found in the template");
                return;
            }

            // Создаем FormData из формы
            const formData = new FormData(form);
            let isFormDataValid = true;

            // Проверяем все поля формы
            props.inputGroupList.forEach(({ name }) => {
                const value = formData.get(name) as string || '';
                const index = props.inputGroupList.findIndex((prop) => prop.name === name);

                if (index !== -1) {
                    const error = props.validate(name, value);
                    this.props.inputGroupList[index].setProps({ error });

                    if (error) {
                        isFormDataValid = false;
                    }
                }
            });

            if (!isFormDataValid) {
                console.log('Form data is not valid');
                return;
            }

            // Отправка данных
            const data = Object.fromEntries(formData);
            console.log('FormData:', data);

            props.controller?.onSubmit(data);
        };

        // Создаем InputGroup для каждого поля
        const inputGroupList: Block[] = props.inputGroupList.map((prop) => {
            return new InputGroup({
                ...prop,
                onBlur,
                onChange,
            });
        });

        // Передаем дополнительные параметры в родительский класс
        super({
            ...props,
            inputGroupList,
            button: new Button({
                label: props.btnTitle || '',
                onClick: onSubmit,
            }),
            showButton: props.showButton || false,
            link: new Link({
                text: props.linkTitle || '',
                onClick: props.onClickLink,
            }),
        });
    }

    public render(): string {
        return formTmpl;
    }
}

export default connect(Form, (state) => state)
