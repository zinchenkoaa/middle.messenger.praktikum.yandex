import "./form.css";
import { Block } from "../../utils/block";
import type { Props } from "../../types";

export class Form extends Block<Props> {
    constructor (props: Props) {
      super(props);
    }
  
    override render (): string {
      return `
      <div class="home">
    <div class="home-container">
    {{#if avatar}}
        {{{ avatar }}}
         {{/if}}

        {{{ header }}}

        <main>
  <form class="form" 
    name="{{ name }}" 
    autocomplete="{{ autocomplete }}" 
    data-id="{{ id }}" 
    novalidate
  >
    ${this.props.body}
  </form>
    </main>
    </div>
</div>
`;
    }
}
