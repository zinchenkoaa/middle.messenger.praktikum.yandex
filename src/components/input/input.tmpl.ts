export default `
<div class="input-wrapper">
    {{#if text }}
        <label for="{{ text }}" class="input-label">{{ text }}</label>
    {{/if}}

    <input
        id="{{ name }}"
        data-id="{{ _id }}"
        data-validation-type="{{ validationType }}"
        type="{{ type }}"
        name="{{ name }}"
        class={{ inputClass }}
        {{#if value}}
            value = "{{ value }}"
        {{/if}}

        {{#if placeholder}}
            placeholder="{{ placeholder }}"
        {{/if}}

        required
        {{#if disabled}}
        disabled
        {{/if}}
     />
</div>
`
