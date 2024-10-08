import Handlebars from "handlebars";
import "./time.css";

const timeHtml = `
<span class="{{ className }}">{{ time }}</span>
`;

interface TimeProps {
    className?: string;
    time: string;
}

export function Time({ className = "message-time", time }: TimeProps) {
    const tmpl = Handlebars.compile(timeHtml);

    const context = {
        className, time
    };

    return tmpl(context);
}
