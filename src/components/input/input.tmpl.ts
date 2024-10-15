export default `
<div>
    {{#if text }}
        <label for="{{ text }}" class="input-label">{{ text }}</label>
    {{/if}}

    <input 
        id="{{ name }}"
        data-id="{{ _id }}"
        data-validation-type="{{ validationType }}"
        type="{{ type }}" 
        name="{{ name }}" 
        class={{ className }}
        {{#if value}}
            value = "{{ value }}"
        {{/if}}

        {{#if placeholder}}
            placeholder="{{ placeholder }}"
        {{/if}}

        required
     />

    <div class="input-error-message show">{{{ errorMessage }}}</div>
    </div>
`
