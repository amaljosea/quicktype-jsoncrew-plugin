import { html, css, LitElement } from 'lit-element';
import { quicktype } from 'quicktype';
// import '@granite-elements/ace-widget';

const LANGUAGE_MODE = {
  "C#": "text/x-csharp",
  "JSON Schema": "application/ld+json",
  JavaScript: "text/javascript",
  TypeScript: "text/typescript",
  "Objective-C": "text/x-objectivec",
  Java: "text/x-java",
  Flow: "text/javascript",
  JSON: "application/ld+json",
  Swift: "text/x-swift",
  Ruby: "text/x-ruby",
  "C++": "text/x-c++hdr",
  Elm: "text/x-elm",
  Go: "text/x-go",
  Kotlin: "text/x-kotlin",
  Rust: "text/x-c"
};

const LANGUAGE_OPTIONS = {
  TypeScript: { "just-types": true },
  Ruby: { "just-types": true },
  Elm: { "just-types": true },
  Go: { "just-types": true },
  "Objective-C": { "just-types": true, features: "interface" },
  Java: { "just-types": true },
  Flow: { "just-types": true },
  "C++": { "just-types": true },
  Rust: { "just-types": true },
  "C#": { features: "attributes-only" },
  Swift: { initializers: false }
};

const dropDown =Object.keys(LANGUAGE_MODE).map((language)=>html`<option value="${language}">${language}</option>`)

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
    `;
  }

  constructor() {
    super();
    this.generatedType = '';
    this.selectedLanguage= 'TypeScript';
  }

  static get properties() {
    return {
      data: { type: String },
      generatedType: { type: String },
      selectedLanguage: { type: String },
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
    this.generatedType = quicktypeResponse.lines.join('\n');
  }

  onLanguageChange(event) {
    console.log("event==>",event)
    this.selectedLanguage = event.target.value;
  }

  render() {
    console.log("selectedLanguage",this.selectedLanguage)
    return html`
      <h1 class="title">Quicktype</h1>
      <h1 class="title">${this.selectedLanguage}</h1>
      <pre>${this.data}</pre>
      <select selected=${this.selectedLanguage} @change=${this.onLanguageChange} class="action-select">
        ${dropDown}
      </select>
      <div style="white-space: pre-line">${this.generatedType}</div>
      <button class="action-button" @click=${this.__transformJson}>Generate type</button>
      <button class="action-button" @click=${this.__copyToClipBoard}>Copy to clipboard</button>
    `;
  }
}
