export default `
<div class="message-container {{#if isUser}}from-user{{else}}from-other{{/if}}">
    <div class="message-bubble">
        {{{ contactMessage }}}
        
        {{{ messageTime }}}
    </div>
</div>
`
