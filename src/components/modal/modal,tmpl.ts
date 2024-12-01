export default `<div class="{{modalClass}}">
              <div class="modal-container">
                  <h3>{{title}}</h1>
                  {{#unless inputHidden}}
                    {{{Input}}}
                  {{/unless}}
                  {{{Button}}}
              </div>
            </div>`
