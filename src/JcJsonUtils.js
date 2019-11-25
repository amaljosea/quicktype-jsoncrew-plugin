import { html, css, LitElement } from 'lit-element';
import { quicktype } from "quicktype";



const code = JSON.stringify({
  name: "Bob",
  age: 99,
  friends: ["Sue", "Vlad"]
});
const start = () => {
  quicktype({
    lang: "Rust",
    sources: [
      {
        kind: "json",
        name: "Person",
        samples: [code]
      }
    ],
    rendererOptions: "Rust"
  }).then(result => {
    console.log("result====>", result);
    // this.codemirror.setValue(result.lines.join("\n").trim());
  });
};
start();

export class JcJsonUtils extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
      }
    `;
  }

  static get properties() {
    return {
      data: { type: String },
    };
  }

  async __transformJson() {
    const data = JSON.parse(this.data);
    data.id = 1;

   const quicktypeResponse = await quicktype({
      lang: "Rust",
      sources: [
        {
          kind: "json",
          name: "Person",
          samples: [code]
        }
      ],
      rendererOptions: "Rust"
    })

    const event = new CustomEvent('json-transform', {
      detail: {
        message: data,
      },
    });

    debugger; 
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <pre>${this.data}</pre>
      <button @click=${this.__transformJson}>Transform</button>
    `;
  }
}
