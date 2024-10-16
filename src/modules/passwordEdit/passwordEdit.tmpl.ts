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
<div class="password-edit">
    {{{ oldPassword }}}
      <p class="error-message">{{{ errorOldPassword }}}</p>
    {{{ newPassword }}}
           <p class="error-message">{{{ errorNewPassword }}}</p>
    {{{ repeatPassword }}}
     <p class="error-message">{{{ errorRepeatPassword }}}</p>

    <div class="password-edit-button">
        {{{ button }}}
         {{{ link }}}
    </div>
</div>
  </form>
    </main>
    </div>
</div>
`
