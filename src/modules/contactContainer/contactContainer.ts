import Handlebars from "handlebars";
import "./contactContainer.css";
import { CardContact } from "../../modules/cardContact";

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

export function ContactContainer() {
    const tmpl = Handlebars.compile(contactContainerHtml);

    const context = {
        contactOne: CardContact({
            contactName: "Иван Иванов", 
            message: "Привет! Как дела?", 
            contactMessageCount: "5", 
            contactLastMessageTime: "10:45"
        }),
        contactTwo: CardContact({
            contactName: "Александр Петров", 
            contactLastMessageTime: "12:40",
            message: "Привет! Во сколько?"
        }),
        contactThree: CardContact({
            contactName: "Василий Макаров", 
            contactLastMessageTime: "06:15",
            message: "Привет! Где?"
        }),
        contactFour: CardContact({
            contactName: "Макс Коржов", 
            contactLastMessageTime: "11:45",
            contactMessageCount: "1", 
            message: "Привет! Во сколько?"
        }),
        contactFive: CardContact({
            contactName: "Андрей Попов", 
            contactLastMessageTime: "16:00",
            message: "Привет!"
        }),
        contactSix: CardContact({
            contactName: "Артем Петров", 
            contactLastMessageTime: "12:45",
            message: "Привет! Я буду"
        }),
        contactSeven: CardContact({
            contactName: "Марк Захаров", 
            contactLastMessageTime: "19:45",
            contactMessageCount: "23", 
            message: "Что? Каво?"
        })
    }

    return tmpl(context);
}
