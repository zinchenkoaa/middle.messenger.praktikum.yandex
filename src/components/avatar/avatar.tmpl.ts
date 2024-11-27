import noAvatar from "../../static/noAvatar.svg";

export default `
<div class="ava">
    <img src="${noAvatar}" alt="Аватар" class="ava-img">

    {{#if changeAva}}
        <div class="ava-overlay">Cменять аватар</div>
    {{/if}}
</div>
`
