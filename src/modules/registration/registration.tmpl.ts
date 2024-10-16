export default `
<div class="registration">
<div class="registration-container">
        {{{ header }}}

        <main>
  <form class="form" 
    name="{{ name }}" 
    autocomplete="{{ autocomplete }}" 
    data-id="{{ id }}" 
    novalidate
  >
<div class="registration-form">
    <div class="registration-inputs">
        {{{ mailInput }}}
        <p class="error-message">{{{ errorMail }}}</p>
        {{{ loginInput }}}
        <p class="error-message">{{{ errorLogin }}}</p>
        {{{ firstNameInput }}}
        <p class="error-message">{{{ errorFirstName }}}</p>
        {{{ secondNameInput }}}
        <p class="error-message">{{{ errorSecondName }}}</p>
        {{{ phoneInput }}}
        <p class="error-message">{{{ errorPhone }}}</p>
        {{{ passwordInput }}}
        <p class="error-message">{{{ errorPassword }}}</p>
    </div>
    <div class="registration-footer">
        {{{ button }}}

        {{{ link }}}
    </div>
</div>
  </form>
    </main>
    </div>
</div>
`
