import { html, render } from 'lit-html';
import '../jc-json-utils.js';

render(
  html`
    <jc-json-utils .data=${'{"name":"Bob","age":99,"friends":["Sue","Vlad"]}'}> </jc-json-utils>
  `,
  document.querySelector('#demo'),
);
