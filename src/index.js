import { LitElement, html } from "lit-element";
import "./styles.css";

/** Import of the other component */
import "./Component/Home/Home";
import "./Component/About/About"


import { router } from "lit-element-router";

/** Lion Imports */
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';

export class AppRoot extends router(LitElement) {

  static get properties() {
    return {
      route: { type: String },
      data: { type: Object }
    };
  }

  static get routes() {
    return [
      {
        name: "home",
        pattern: "*",
        data: { title: "Home" },
      },
      {
        name: "about",
        pattern: "about",
      },
    ];
  }

  constructor() {
    super();
    this.init();
  }

  init() {
    this.route = "";
    this.data = {};
  }

  router(route, data) {
    this.route = route;
    this.data = data;
  }
  render() {
    return html`
      <div class="container">
        <main-wrapper active-route=${this.route}>
          ${
            this.route === "home"? html`<app-home route="home"></app-home>`: html ``
          }
          ${
            this.route === "about"?html`<app-about route="about"></app-about>`: html``
          }
        </main-wrapper>
      </div>
    `;
  }
}

window.customElements.define("app-root", AppRoot);
