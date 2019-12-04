import { html, css, LitElement } from 'lit-element';
import { quicktype } from 'quicktype';
// import '@granite-elements/ace-widget';

const LANGUAGE_MODE = {
  TypeScript: 'text/typescript',
  'C#': 'text/x-csharp',
  'JSON Schema': 'application/ld+json',
  JavaScript: 'text/javascript',
  'Objective-C': 'text/x-objectivec',
  Java: 'text/x-java',
  Flow: 'text/javascript',
  Swift: 'text/x-swift',
  Ruby: 'text/x-ruby',
  'C++': 'text/x-c++hdr',
  Elm: 'text/x-elm',
  Go: 'text/x-go',
  Kotlin: 'text/x-kotlin',
  Rust: 'text/x-c',
};

const LANGUAGE_OPTIONS = {
  TypeScript: { 'just-types': true },
  Ruby: { 'just-types': true },
  Elm: { 'just-types': true },
  Go: { 'just-types': true },
  'Objective-C': { 'just-types': true, features: 'interface' },
  Java: { 'just-types': true },
  Flow: { 'just-types': true },
  'C++': { 'just-types': true },
  Rust: { 'just-types': true },
  'C#': { features: 'attributes-only' },
  Swift: { initializers: false },
};

const dropDown = Object.keys(LANGUAGE_MODE).map(
  language =>
    html`
      <option value="${language}">${language}</option>
    `,
);

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
        border-left: 10px solid #3b8beb;
      }
      .action-select {
        width: 80%;
        display: block;
        margin: 0 auto;
        border: 1px solid #3b8beb;
        padding: 10px;
        margin-top: 25px;
        box-shadow: none;
        cursor: pointer;
      }
      .action-button:hover {
        background-color: rgba(59, 139, 235, 0.9);
      }
      .type-card {
        white-space: pre-line;
        display: block;
        box-shadow: none;
        margin: 25px auto 0px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(59, 139, 235);
        border-image: initial;
        padding: 10px;
      }
    `;
  }

  constructor() {
    super();
    this.generatedType = '';
    this.selectedLanguage = 'TypeScript';
  }

  connectedCallback() {
    super.connectedCallback();
    this.getTypeFromJson();
  }

  static get properties() {
    return {
      data: { type: String },
      generatedType: { type: String },
      selectedLanguage: { type: String },
    };
  }

  async getTypeFromJson() {
    let quicktypeResponse = '';
    try {
      quicktypeResponse = await quicktype({
        lang: this.selectedLanguage,
        sources: [
          {
            kind: 'json',
            name: 'TopLevel',
            samples: [this.data],
          },
        ],
        rendererOptions: LANGUAGE_OPTIONS[this.selectedLanguage],
      });
      if (quicktypeResponse.lines.length) {
        this.generatedType = quicktypeResponse.lines.join('\n');
      }
    } catch (error) {
      this.generatedType = 'Error!';
    }
  }

  onLanguageChange(event) {
    this.selectedLanguage = event.target.value;
    this.getTypeFromJson();
  }

  copyToClipBoard() {
    navigator.clipboard.writeText(this.generatedType);
  }

  render() {
    return html`
      <h1 class="title">Quicktype</h1>
      <h2 class="title">${this.selectedLanguage}</h2>
      <select
        selected=${this.selectedLanguage}
        @change=${this.onLanguageChange}
        class="action-select"
      >
        ${dropDown}
      </select>
      ${!this.data
        ? html`
            <p>Give a valid Json and try again</p>
          `
        : ''}
      <div class="type-card">${this.generatedType}</div>
      ${this.generatedType && this.generatedType !== 'Error!'
        ? html`
            <button class="action-button" @click=${this.copyToClipBoard}>Copy to clipboard</button>
          `
        : ''}
    `;
  }
}
