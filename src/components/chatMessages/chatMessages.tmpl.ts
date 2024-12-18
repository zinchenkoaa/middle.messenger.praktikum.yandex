export default `
<div class="all-message">
    {{#if currentChatId}}
        <div class="content-wrapper">
                <header class="message-header">
            {{{chatProfile}}}
            {{{usersDr}}}
            <span class="close-chat">
                {{{buttonAdd}}}
                {{{buttonDelete}}}
            </span>
        </header>

            <div class="messages-container">
                {{{Messages}}}
            </div>

            <div class="message-input-container">
                {{{messageInput}}}
            </div>
        </div>
    {{else}}
        <div class="chat-noselected">Выберите чат или добавьте новый</div>
    {{/if}}
</div>
`
