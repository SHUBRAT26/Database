import Home from "../Component/Home/Home";
import { expect, fixture, html, unsafeStatic } from "@open-wc/testing";

const assert = chai.assert;

suite("Header element test", () => {
  test("Header element should be able to define", () => {
    const el = document.createElement(`app-home`);
    assert.instanceOf(el, Home);
  });

  suite("Home element test", () => {
    test("Home by default dialog visible to true", async () => {
      const el = await fixture("<app-home></app-home>");
      expect(el.dialogVisible).to.equal(true);
    });
  });

  suite("Home element test", () => {
    test('search input element should get the data', async () => {
        const el = await fixture(html`<app-home></app-home>`);
        const menu = el.shadowRoot.querySelector('#search_id');
        expect(menu.nodeValue).to.equal(null)
    });

  })

  suite("Home element test", () => {
    test('Edit button click open modal dialog', async () => {
        const el = await fixture(html`<app-home></app-home>`);
        const editBtn = el.shadowRoot.querySelector('.edit-btn');
        
        editBtn.click();
        expect(el.dialogVisible).to.equal(false)
    });

  })

  // test('has a sideBar', async () => {
  //     const el = await fixture(html`<app-home></app-home>`);
  //     const sideBar = el.shadowRoot.getElementByClassName('.bookLanding__homepage');
  //     const sideBar2 = sideBar.getElementByTagName('side-bar')
  // });

  // test('Delete specific data from after delete button click', async () => {
  //     const el = await fixture(html`<app-home></app-home>`);
  //     const deleteBtn = el.shadowRoot.querySelector('.delete-btn');

  //     deleteBtn.click();
  //     await el.updateComplete;
  // });

  // test('side navigation drawer should close', async () => {
  //     const el = await fixture(html`<header-element></header-element>`);
  //     const menu = el.shadowRoot.querySelector('.menu');

  //     menu.click();
  //     await el.updateComplete;

  //     const closeBtn = el.shadowRoot.querySelector('.closebtn');
  //     closeBtn.click();
  //     await el.updateComplete;

  //     const sideBar = el.shadowRoot.querySelector('#drawer');
  //     assert.equal(sideBar.style.width, "0px");
  // });
});
