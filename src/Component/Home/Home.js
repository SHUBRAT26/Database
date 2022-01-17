import { LitElement, html } from "lit-element";
import "../App/SideBar";
import "../App/Modal";
import { css } from "@lion/core";
import globalCss from "../../CSS/style-module";
import { repeat } from "lit-html/directives/repeat.js";

export default class Home extends LitElement {
  /**
   * Return object
   */
  static get properties() {
    return {
      EditData: { type: Object },
      dialogVisible: { type: Boolean },
      receiveEditFormData: { type: String },
    };
  }

  constructor() {
    super();
    this.dialogVisible = true;
    this.sendEditFormData;
  }
  /**
   * Returns styles specifically related to this component
   */
  static get styles() {
    return [
      globalCss,
      css`
        .main__body {
          background-image: url("../../Asset/dark_background.jpg");
        }
        .bookLanding__homepage {
          background-color: #59a758;
          overflow-y: scroll;
          height: 405px;
          border: 5px solid white;
        }

        .table {
          display: table;
          width: auto;
          border: 1px solid #666666;
        }
        th {
          text-align: center;
          color: #2c5aaf;
        }

        td {
          text-align: center;
          font-weight: bold;
        }
        tr:nth-child(odd) {
          background-color: #dfff00;
        }

        .userDataForm {
          display: flex;
          justify-content: center;
          background-color: #34568b;
          color: white;
          align-item: center;
          border: 1px solid #34568b;
          margin-left: 32%;
          margin-top: 2%;
          margin-bottom: 5%;
          padding: 1%;
          width: 30%;
        }
        .btn-submit {
          color: black;
          align: center;
          margin: 10px;
          margin-left: 35%;
          background-color: yellow;
        }
        .option-btn {
          margin: 15px;
          height: 25px;
        }
        footer {
          background-color: rebeccapurple;
          text-align: center;
          color: white;
          font-size: 19px;
        }

        .searchBox {
          margin: 15px;
          float: right;
        }

        #search_id {
          float: right;
        }

        #search_click {
          margin-right: 5px;
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
        if (localStorage.getItem("data1")) {
          let value1 = JSON.parse(localStorage.getItem("data1"));
          value1.forEach((element) => {
            this.recommendedData2.data.push(element);
          });
        } else {
          this.recommendedData2;
        }
        if (localStorage.getItem("updatedData")) {
          let updatedData2 = JSON.parse(localStorage.getItem("updatedData"));
          for (let i = 0; i < this.recommendedData2.data.length; i++) {
            if (
              this.recommendedData2.data[i].id === parseInt(updatedData2.id)
            ) {
              this.recommendedData2.data[i].first_name =
                updatedData2.first_name;
              this.recommendedData2.data[i].last_name = updatedData2.last_name;
              this.recommendedData2.data[i].email = updatedData2.email;
            }
          }
        } else {
          this.recommendedData2;
        }
      })
      .catch((err) => {
        this.errorResponse = err;
      });
    super.connectedCallback();
  }

  render() {
    let finalTemplate;
    if (!this.errorResponse) {
      finalTemplate = html`
        <div class="main__body">
          <div class="bookLanding__homepage">
            <side-bar></side-bar>
            <div id="myModal" class="modal">
              <modal-dialog></modal-dialog>
            </div>
            <div class="searchBox">
              <span>
                <lion-input name="search" id="search_id"></lion-input>
              </span>
              <span>
              <lion-button
                  name="seachBtnClick"
                  id="search_click"
                  @click="${this.searchList}"
                  >Search</lion-button
                >
                </span>
            </div>
            <table width="100%" border="1">
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Delete Specific Data</th>
                <th>Edit Specific Data</th>
              </tr>
              <tr id="myList">
                <td>
                  ${repeat(
                    this.recommendedData2.data,
                    (item) => item.id,
                    (item) => html`<p><td>${JSON.stringify(item.id)}</td></p>
                      <hr />`
                  )}
                </td>
                <td>
                  ${repeat(
                    this.recommendedData2.data,
                    (item) => item.id,
                    (item) => html`<p>
                        <td>${item.first_name}</td>
                      </p>
                      <hr />`
                  )}
                </td>
                <td>
                  ${repeat(
                    this.recommendedData2.data,
                    (item) => item.id,
                    (item) => html`<p>
                        <td>${item.last_name}</td>
                      </p>
                      <hr />`
                  )}
                </td>
                <td>
                  ${repeat(
                    this.recommendedData2.data,
                    (item) => item.id,
                    (item) => html`<p><td>${item.email}</td></p>
                      <hr />`
                  )}
                </td>
                <td>
                  ${repeat(
                    this.recommendedData2.data,
                    (item) => item.id,
                    (item) => html`<p class="option-btn">
              <lion-button class="delete-btn" @click=${this.deleteData.bind(
                this,
                item
              )}>Delete</lion-buton>
              </p><hr>`
                  )}
                </td>
                <td>
                  ${repeat(
                    this.recommendedData2.data,
                    (item) => item.id,
                    (item) => html`<p class="option-btn">
              <lion-button class="edit-btn" @click=${this.EditDataDialog.bind(
                this,
                item
              )}>Edit</lion-buton>
              </p><hr>`
                  )}
                </td>
              </tr>
            </table>
            <my-dialog
              ?opened="${this.dialogVisible}"
              data="${this.sendEditFormData}"
            ></my-dialog>
          </div>
          <div class="userDataForm">
            <lion-form>
              <form (ngSubmit)="formData($event)">
                <label>First Name</label>
                <lion-input
                  name="firstName"
                  id="fName"
                  .modelValue=${this.firstName}
                ></lion-input>
                <label>Last Name</label>
                <lion-input
                  name="lastName"
                  id="lName"
                  .modelValue=${this.lastName}
                ></lion-input>
                <label>Email</label>
                <lion-input
                  name="email"
                  id="eMail"
                  .modelValue=${this.email}
                ></lion-input>
                <label>Job</label>
                <lion-input
                  name="job"
                  id="job"
                  .modelValue=${this.job}
                ></lion-input>
                <lion-button
                  type="Submit"
                  class="btn-submit"
                  @click="${this.formData}"
                  >Submit</lion-button
                >
              </form>
            </lion-form>
          </div>
          <footer>App Made by Shubrat Singh</footer>
        </div>
      `;
    } else {
      finalTemplate = html`<div class="no-search">
        <h3 class="error">Something went wrong!</h3>
        <small
          >Cause of error could be api key expired or internet
          connectivity!</small
        >
      </div>`;
    }

    return finalTemplate;
  }

  /** Form Data method */
  formData() {
    let fName = this.shadowRoot.getElementById("fName").value;
    let lName = this.shadowRoot.getElementById("lName").value;
    let eMail = this.shadowRoot.getElementById("eMail").value;
    let job = this.shadowRoot.getElementById("job").value;
    let headerData = {
      first_name: fName,
      last_name: lName,
      email: eMail,
      job: job,
    };
    this.getDevices(headerData);
  }

  /** POST api call for the new data entry ID generation */
  getDevices = async (data) => {
    try {
      await fetch(`https://reqres.in/api/users`, {
        method: "POST",
        headers: {
          name: data.first_name,
          job: data.job,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.postData = JSON.stringify(json);
          this.postData2 = JSON.parse(this.postData);
          data.id = parseInt(this.postData2.id);
          const items = (() => {
            const fieldValue = localStorage.getItem("data1");
            return fieldValue === null ? [] : JSON.parse(fieldValue);
          })();
          items.push(data);
          localStorage.setItem("data1", JSON.stringify(items));
          location.reload();
        });
    } catch (e) {
      return e;
    }
  };

  deleteData = async (id) => {
    await fetch(`https://reqres.in/api/users/2`, {
      method: "DELETE",
    })
      .then((response) => {
        for (let i = 0; i < this.recommendedData2.data.length; i++) {
          if (this.recommendedData2.data[i].id === id.id) {
            this.recommendedData2.data.splice(i, 1);
            if (localStorage.getItem("data1")) {
              let localStorageFormData = JSON.parse(
                localStorage.getItem("data1")
              );
              for (let i = 0; i < localStorageFormData.length; i++) {
                let localStorageFormData2 = localStorageFormData[i];
                if (localStorageFormData2.id == id.id) {
                  localStorageFormData.splice(i, 1);
                  let localStorageFormData3 = JSON.stringify(
                    localStorageFormData
                  );
                  localStorage.setItem("data1", localStorageFormData3);
                }
              }
            }
            this.requestUpdate();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  searchList() {
    let searchData = this.shadowRoot.getElementById("search_id").value;
    this.storedData = this.recommendedData2.data;
    if(searchData){
      var newArray = this.recommendedData2.data.filter(function (el) {
        return (
          el.id === parseInt(searchData) ||
          el.first_name.toLowerCase() === searchData.toLowerCase() ||
          el.last_name.toLowerCase() === searchData.toLowerCase()
        );
      });
      if (newArray.length !== 0) {
        this.recommendedData2.data = newArray;
        this.requestUpdate();
        setTimeout(() => {
          this.recommendedData2.data = this.storedData;
        }, 1000);
      }else {
        this.recommendedData2.data = this.storedData;
        window.alert('No data present')
        this.requestUpdate();
      }
    }else{
      window.alert('Please enter the Data')
    }
    
  }

  EditDataDialog(e) {
    this.sendEditFormData = e;
    this.dialogVisible = !this.dialogVisible;

  }

  closeDialog(e) {
    console.log(e);
    this.dialogVisible = true;
  }
}

customElements.define("app-home", Home);
