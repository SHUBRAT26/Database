import { css } from 'lit-element';

/**
 * Contains application level global style definitions.
 * This has to include in component styles method which want to use global css class
 */
export default css `
    html {
        display: flex;
    }
    :host {
        --orange-bg-color: #FF6200;
    }
`;