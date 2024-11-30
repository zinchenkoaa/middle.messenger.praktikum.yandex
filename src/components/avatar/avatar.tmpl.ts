import noAvatar from "../../static/noAvatar.svg";

export default `
<div class="ava">
    {{#if avatar}}
    <img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}" alt="Аватар" class="ava-img">
    {{else}}
     <img src="${noAvatar}" alt="Аватар" class="ava-img">
     <div class="ava-overlay" />
     {{/if}}

    <input type="file" name="ava" accept="image/*" hidden/>
</div>
`
