import { LitElement, html } from "lit-element";
import { css } from "@lion/core";
import globalCss from "../../CSS/style-module";
import "../App/SideBar";

class About extends LitElement {
  /**
   * Returns styles specifically related to this component
   */
  static get styles() {
    return [
      globalCss,
      css`
        
        .card {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          transition: 0.3s;
          width: 40%;
          transform: translate(-50%, -50%);
          position: absolute;
          left: 50%;
          top: 50%;
          height: 80%
        }

        .card:hover {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }

        .container {
          padding: 2px 16px;
        }
      `,
    ];
  }

  /**
   * Lifecycle callback method
   */
  async connectedCallback() {
    await fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.recommendedData = JSON.stringify(json);
        this.recommendedData2 = JSON.parse(this.recommendedData);
      })
      .catch((err) => {
        this.errorResponse = err;
      });
    super.connectedCallback();
  }

  render() {
    return html`
    <side-bar></side-bar>
      <div class="card">
        <img
          src="${this.recommendedData2.data[1].avatar}"
          alt="Avatar"
          style="width:100%"
        />
        <div class="container">
          <h4><b>Creater: John Doe</b></h4>
          <p>The Panda has become the symbol of WWF. The well-known panda logo of WWF originated from a panda named Chi Chi that was transferred from the Beijing Zoo to the London Zoo in the same year of the establishment of WWF.</p>
        </div>
      </div>
    `;
  }
}

customElements.define("app-about", About);
