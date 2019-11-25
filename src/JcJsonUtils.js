import { html, css, LitElement } from 'lit-element';
import { quicktype } from 'quicktype';
// import '@granite-elements/ace-widget';

export class JcJsonUtils extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0 20px;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
          sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
      }
      .editor {
        height: 80%;
      }
      .title {
        margin-top: 0;
      }
      .action-button {
        width: 80%;
        display: block;
        margin: 0 auto;
        background-color: rgb(59, 139, 235);
        color: #ffffff;
        padding: 10px;
        margin-top: 25px;
        border: 0;
        box-shadow: none;
        cursor: pointer;
      }
      .action-button:hover {
        background-color: rgba(59, 139, 235, 0.9);
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
    let quicktypeResponse = '';
    try {
      quicktypeResponse = await quicktype({
        lang: 'Rust',
        sources: [
          {
            kind: 'json',
            name: 'Person',
            samples: [this.data],
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
      <h1 class="title">Quicktype</h1>
      <pre>${this.data}</pre>
      <div style="white-space: pre-line">${this.generatedTypes}</div>
      <button class="action-button" @click=${this.__transformJson}>Generate type</button>
      <button class="action-button" @click=${this.__copyToClipBoard}>Copy to clipboard</button>
    `;
  }
}
