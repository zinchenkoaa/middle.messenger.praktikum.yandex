import "./contactContainer.css";
import { CardContact } from "../../modules/cardContact";
import { Block } from "../../utils/block";

const contactContainerHtml: string = `
<div class="contact-container">
    {{{ contactOne }}}
    {{{ contactTwo }}}
    {{{ contactThree }}}
    {{{ contactFour }}}
    {{{ contactFive }}}
    {{{ contactSix }}}
    {{{ contactSeven }}}
</div>
`;

export class ContactContainer extends Block {
    constructor() {
        super({contactOne: new CardContact({
            contactName: "Иван Иванов", 
            message: "Привет! Как дела?", 
            contactMessageCount: "5", 
            contactLastMessageTime: "10:45"
        }),
        contactTwo: new CardContact({
            contactName: "Александр Петров", 
            contactLastMessageTime: "12:40",
            message: "Привет! Во сколько?"
        }),
        contactThree: new CardContact({
            contactName: "Василий Макаров", 
            contactLastMessageTime: "06:15",
            message: "Привет! Где?"
        }),
        contactFour: new CardContact({
            contactName: "Макс Коржов", 
            contactLastMessageTime: "11:45",
            contactMessageCount: "1", 
            message: "Привет! Во сколько?"
        }),
        contactFive: new CardContact({
            contactName: "Андрей Попов", 
            contactLastMessageTime: "16:00",
            message: "Привет!"
        }),
        contactSix: new CardContact({
            contactName: "Артем Петров", 
            contactLastMessageTime: "12:45",
            message: "Привет! Я буду"
        }),
        contactSeven: new CardContact({
            contactName: "Марк Захаров", 
            contactLastMessageTime: "19:45",
            contactMessageCount: "23", 
            message: "Что? Каво?"
        })
    })
    }

    override render(): string {
        return contactContainerHtml;
    }
}
