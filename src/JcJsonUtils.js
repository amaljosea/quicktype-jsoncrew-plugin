import { html, css, LitElement } from 'lit-element';
import { quicktype } from 'quicktype';

export class JcJsonUtils extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
      }
    `;
  }

  constructor() {
    super();
    this.generatedTypes = '';
  }

  static get properties() {
    return {
      data: { type: String },
      generatedTypes: { type: String },
    };
  }

  async __transformJson() {
    const data = JSON.parse(this.data);
    const code = JSON.stringify({
      name: 'Bob',
      age: 99,
      friends: ['Sue', 'Vlad'],
    });
    data.id = 1;
    let quicktypeResponse = '';
    try {
      quicktypeResponse = await quicktype({
        lang: 'Rust',
        sources: [
          {
            kind: 'json',
            name: 'Person',
            samples: [code],
          },
        ],
        rendererOptions: 'Rust',
      });
    } catch (error) {
      console.log('error===>', error);
    }
    this.generatedTypes = quicktypeResponse.lines.join('\n');
  }

  render() {
    return html`
      <pre>${this.data}</pre>
      <div>yooo</div>
      <div style="white-space: pre-line">${this.generatedTypes}</div>
      <button @click=${this.__transformJson}>Transform</button>
    `;
  }
}
