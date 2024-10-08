import Handlebars from "handlebars";
import "./error.css";

const errorHtml =     `
<div class="error">
    <div class="error-code">
        {{ errorCode }}
    </div>
    <div class="error-text">
        {{ errorText }}
    </div>
    <div class="error-link">
        <a href="/chat">Назад к чатам</a>
    </div>
</div>
`;

export function error(errorCode: string) {
    const tmpl = Handlebars.compile(errorHtml);
    let context = {};

    switch (errorCode) {
        case "404":
            context = {
                errorCode: "404",
                errorText: "Не туда попали"
            }
            break;
        case "500":
            context = {
                errorCode: "500",
                errorText: "Мы уже фиксим"
            }
            break;
    }

    return tmpl(context);
}
