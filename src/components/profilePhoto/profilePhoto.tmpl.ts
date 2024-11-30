import noAvatar from "../../static/noAvatar.svg";

export default `<div class="profile-photo">
                  {{#if avatar}}
              <img src="{{img_src}}" alt="ava" class="ava-prof">
    {{else}}
     <img src="${noAvatar}" alt="Аватар" class="ava-img">
     {{/if}}

              <span class="profile-name">{{display_name}}</span>
            </div>`
