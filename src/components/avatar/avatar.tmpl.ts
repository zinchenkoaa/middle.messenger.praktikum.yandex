import noAvatar from "../../static/noAvatar.svg";

export default `
<div class="ava">
    {{#if avatar}}
    <img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}" alt="Аватар" class="ava-img">
    {{else if img_src}}
     <img src="{{img_src}}" alt="Аватар" class="ava-img">
     {{else}}
     <img src="${noAvatar}" alt="Аватар" class="ava-img">
     {{/if}}

    {{#if changeAva}}
        <input type="file" name="ava" accept="image/*" hidden/>
    {{/if}}
</div>
`
