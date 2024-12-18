import {Block} from "../../utils/block";
import store from "../../utils/store/store";
import connect from "../../utils/store/connect";
import {Button} from "../button";
import "./form.css";
import formTmpl from "./form.tmpl";
import InputGroup from "../inputGroup/inputGroup";
import {Link} from "../link";

interface FormSettings {
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
            console.log(name, value);
            store.set(name, value);
            console.log('value', value);
        }

        const onBlur = (e: Event): void => {
            const target = e.target as HTMLInputElement;
            const { name, value } = target;
            const index = props.inputGroupList.findIndex((prop) => prop.name === name);
            if (index != -1) {
                const error = props.validate(name, value);
                this.lists.inputGroupList[index].setProps({ error });
            }
        }

        const onSubmit = (e:Event):void => {
            e.preventDefault();
            const rootElement = this.getContent();
            const form = rootElement?.querySelector('form') as HTMLFormElement;

            if (!form || !(form instanceof HTMLFormElement)) {
                console.error("No valid form element found in the template");
                return;
            }

            // Создать FormData из формы
            const formData = new FormData(form);


            let isFormDataValid = true;

            props.inputGroupList.forEach(({ name }) => {
                const value = formData.get(name) as string || '';
                const index = props.inputGroupList.findIndex((prop) => prop.name === name);
                if (index != -1) {
                    const error = props.validate(name, value);
                    this.lists.inputGroupList[index].setProps({ error });
                    if (error) {
                        isFormDataValid = false;
                    }
                }
            });

            if (!isFormDataValid) {
                console.log('Form  data is not valid')
                return;
            }
            console.log('formData', Object.fromEntries(formData));
            props.controller?.onSubmit(Object.fromEntries(formData));
        }

        // Создаем InputGroup для каждого поля
        const inputGroupList: Block[] = props.inputGroupList
            .map((prop) => ({
                ...prop,
                onBlur: onBlur,
                onChange: onChange,
            }))
            .map((prop) => (new InputGroup(prop)))

        // Передаем дополнительные параметры в родительский класс
        super({
            ...props,
            inputGroupList,
            button: new Button({
                label: props.btnTitle ?? '',
                onClick: onSubmit,
            }),
            showButton: props.showButton ?? false,
            link: new Link({
                text: props.linkTitle ?? '',
                onClick: props.onClickLink,
            }),
        });
    }

    public render(): string {
        return formTmpl;
    }
}

export default connect(Form, (state) => state)
