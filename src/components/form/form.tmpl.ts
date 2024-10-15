export default
`
      <div class="home">
    <div class="home-container">
    {{#if avatar}}
        {{{ avatar }}}
         {{/if}}

        {{{ header }}}

        <main>
  <form class="form" 
    name="{{ name }}" 
    autocomplete="{{ autocomplete }}" 
    data-id="{{ id }}" 
    novalidate
  >
    {{ body }}
  </form>
    </main>
    </div>
</div>
`;
