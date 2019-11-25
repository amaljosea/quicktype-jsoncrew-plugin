import { html, render } from 'lit-html';
import '../jc-json-utils.js';

render(
  html`
    <jc-json-utils .data=${'{ "thing": "nothing" }'}>
    </jc-json-utils>
  `,
  document.querySelector('#demo')
);