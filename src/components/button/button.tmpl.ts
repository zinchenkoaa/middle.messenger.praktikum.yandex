export default 
`
<button data-id="{{ id }}"
    id="{{ type }}liilii"
    type="{{ type }}"
    class="button {{ className }}"
    {{#if disabled }}
      disabled
    {{/if}}
    >
    {{{ label }}}
</button>
`
