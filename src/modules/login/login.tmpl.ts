export default 
`
<div class="login">
<div class="login-container">
        {{{ header }}}

        <main>
  <form class="form" 
    name="{{ name }}" 
    autocomplete="{{ autocomplete }}" 
    data-id="{{ id }}" 
    novalidate
  >
<div class="login-form">
    <div class="login__inputs">
        {{{ loginInput }}}
        <p class="error-message">{{{ errorLogin }}}</p>
        {{{ passwordInput }}}
         <p class="error-message">{{{ errorPassword }}}</p>
    </div>

    <div class="login-footer">
        {{{ button }}}

        {{{ link }}}
    </div>
</div>
  </form>
    </main>
    </div>
</div>
`
