import { LitElement, html } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

class MyDialog extends LitElement {
    
  constructor() {
    super();
  }

  /**
  * Returns element properties
  */
  static get properties() {
    return {
      opened: { type: Boolean },
      data: { type: String}
    };
  }

  fetchData() {  
    this.fetchedUser_id = this.shadowRoot.getElementById('fetchedUser_id').innerText
    this.updatedFirstName = this.shadowRoot.getElementById('updatedFirstName').value
    this.updatedLastName = this.shadowRoot.getElementById('updatedLastName').value
    this.updatedEmail = this.shadowRoot.getElementById('updatedEmail').value
    this.updatedJob = this.shadowRoot.getElementById('updatedJob').value
    let headerData = {
      first_name: this.updatedFirstName,
      last_name: this.updatedLastName,
      email: this.updatedEmail,
      job: this.updatedJob,
      id: this.fetchedUser_id

    };
    localStorage.setItem("updatedData", JSON.stringify(headerData))
    location.reload()
  }  

  render() {
    return html` <style>
        .opened {
          display: flex;
        }
        .closed {
          display: none;
        }
        .dialog {
          flex-direction: column;
          border: 2px outset black;
          padding: 1em;
          margin: 1em;
        }
        .buttons {
          display: flex;
          flex-direction: row;
        }
        .accept {
          justify-content: space-around;
          align-content: space-around;
        }
        .cancel {
          justify-content: space-around;
          align-content: space-around;
        }

        .dialog{
          width: 50%;
          align-items: center;
          text-align: center;
          color: white;
          background-color: #34568B;
          position: relative;
          left: 21%;
        }
      </style>
      <div
        class="${classMap({
          dialog: true,
          opened: !this.opened,
          closed: this.opened,
        })}"
      >
        <h1 class="title ">Edit your Data</h1>
        <div id="fetchedUser_id">${this.data.id}</div>
        <lion-form>
    <form>
      <lion-input name="firstName" id="updatedFirstName" label="First Name" .modelValue=${this.data.first_name}></lion-input>
      <lion-input name="lastName" id="updatedLastName" label="Last Name" .modelValue=${this.data.last_name}></lion-input>
      <lion-input name="email" id="updatedEmail" label="Email" .modelValue=${this.data.email}></lion-input>
      <lion-input name="job" id="updatedJob" label="Job" .modelValue='Enter Job you want to update'></lion-input>
      
    </form>
  </lion-form>
        <button @click="${this.fetchData}">Update</button>
      </div>`;
  }
}

customElements.define("my-dialog", MyDialog);
