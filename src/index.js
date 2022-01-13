import { LitElement, html } from "lit-element";
import "./styles.css";

/** Import of the other component */
import "./Component/Home/Home";
import "./Component/IndianBooks/IndianBooks";
import "./Component/InternationalBooks/Internationalbook";

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
        name: "IndianBooks",
        pattern: "IndianBooks",
      },
      {
        name: "InternationalBooks",
        pattern: "InternationalBooks",
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
            this.route === "IndianBooks"?html`<app-indian-books route="IndianBooks"></app-indian-books>`: html``
          }
          ${
            this.route === "InternationalBooks"? html`<app-book-international route="InternationalBooks"    ></app-book-international>`: html``
          }
        </main-wrapper>
      </div>
    `;
  }
}

window.customElements.define("app-root", AppRoot);
