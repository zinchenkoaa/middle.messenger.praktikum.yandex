export default `
<div class="all-message">
                  {{#if currentChatId}}
                                  <header class="message-header">
                  {{{chatProfile}}}
                  {{{usersDr}}}
       <span class="close-chat">
        {{{buttonAdd}}}
        {{{buttonDelete}}}
      </span>
                </header>

        <div class="container">
            {{{messagesU}}}
        </div>
                {{{ messageInput }}}
                      {{else}}

                <div class="chat-noselected">Выберите чат или добавьте новый</div>


              {{/if}}
    </div>
`
