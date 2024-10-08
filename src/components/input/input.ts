import Handlebars from "handlebars";
import "./input.css";

const inputHtml = `
    {{#if text }}
        <label for="{{ name }}" class="input-label">{{ text }}</label>
    {{/if}}

    <input 
        type="{{ type }}" 
        name="{{ name }}" 
        class={{ className }}
        {{#if value}}
            value = "{{ value }}"
        {{/if}}

        {{#if placeholder}}
            placeholder="{{ placeholder }}"
        {{/if}}

        {{#if disabled}}
            disabled
        {{/if}}

        required={{ required }} />

        {{#if errorMessage}}
            <div class="input-error-message hide">{{ errorMessage }}</div>
        {{/if}}
`;

interface InputProps {
    name?: string;
    text?: string;
    type?: string;
    className?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errorMessage?: string;
}

export function Input({
    name,
    text,
    type = "text",
    placeholder,
    value,
    required = false,
    disabled = false,
    className = "input-type",
    errorMessage,
}: InputProps) {

    const template = inputHtml;
    const tmpl = Handlebars.compile(template);
    const context = { name, text, type, className, required, value, disabled, errorMessage, placeholder };

    return tmpl(context);
}
