export default `
<div class="contact-card">

    <img class="avatar" src="https://via.placeholder.com/50" alt="Аватар">

    <div class="contact-info">
        <div class="contact-header">
            <div class="contact-card-info">
                <span class="contact-name">{{ title }}</span>

                {{#if messageInit}}
                    {{{ messageInit }}}
                {{/if}}
            </div>

            <div class="info">
                {{{ contactTime }}}

                {{#if contactMessageCount}}
                    <div class="unread-messages-count">{{ contactMessageCount }}</div>
                {{/if}}
            </div>
        </div>
    </div>
</div>
`
