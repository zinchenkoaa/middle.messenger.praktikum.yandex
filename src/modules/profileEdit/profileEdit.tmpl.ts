export default `
<div class="registration">
<div class="registration-container">
{{{ avatar }}}
        {{{ header }}}

        <main>
  <form class="form" 
    name="{{ name }}" 
    autocomplete="{{ autocomplete }}" 
    data-id="{{ id }}" 
    novalidate
  >
<div class="profile-edit">
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
        {{{ displayNameInput }}}
        <p class="error-message">{{{ errorDisplayName }}}</p>
     
    <div class="profile-edit-button">
        {{{ button }}}

        
    </div>
    {{{ link }}}
</div>
  </form>
    </main>
    </div>
</div>
`
