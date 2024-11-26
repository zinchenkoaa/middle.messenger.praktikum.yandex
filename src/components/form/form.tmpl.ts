export default
`
<div class="form-wrapper">
<div class="form-container">
{{{avatar}}}
                <h1 class="header">{{{header}}}</h1>

        <main>
  <form class="form"
    name="{{ name }}"
    autocomplete="{{ autocomplete }}"
    data-id="{{ id }}"
    novalidate
  >
<div class="login-form">
    <div class="login__inputs">
      {{{inputGroupList}}}
      {{{tempInput}}}
    </div>

        {{#if showButton}}
                <div class="form-footer">
        {{{ button }}}

        {{{ link }}}
    </div>
        {{/if}}

        {{#if linkProfileEdit}}
        <div class="profile-view-links">
    {{{ linkProfileEdit }}}
    {{{ linkPasswordEdit }}}
    {{{ linkLogout }}}
</div>
        {{/if}}

</div>
  </form>
    </main>
    </div>
</div>
`
