import { html, render } from 'lit-html';
import '../jc-json-utils.js';

render(
  html`
    <quicktype-jsoncrew-plugin .data=${'{"name":"Bob","age":99,"friends":["Sue","Vlad"]}'}>
    </quicktype-jsoncrew-plugin>
  `,
  document.querySelector('#demo'),
);
