import Handlebars from "handlebars";
import "./message.css";

const messageHtml = `
    <p class="{{ className}}">{{ textMessage }}</p>
`;

interface MessageProps {
    textMessage: string;
    className?: string;
}

export function Message({ textMessage, className = "last-message" }: MessageProps) {
    const tmpl = Handlebars.compile(messageHtml);

    const context = {
        textMessage,
        className
    }

    return tmpl(context);
}
