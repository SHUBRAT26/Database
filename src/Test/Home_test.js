import Home from '../Component/Home/Home';
import {expect, fixture, html, unsafeStatic} from '@open-wc/testing';

const assert = chai.assert;

suite('Header element test', () => {
    test('Header element should be able to define', () => {
        const el = document.createElement(`app-home`);
        assert.instanceOf(el, Home);
    });

    // test('header should have app drawer', async () => {
    //     const el = await fixture(html`<header-element></header-element>`);
    //     const sideBar = el.shadowRoot.querySelector('#drawer');
    //     assert.instanceOf(sideBar, HTMLDivElement);
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