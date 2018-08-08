/*!
 * O-RANGO - MIT License
 * Built with http://stenciljs.com
 */
const { h } = window.OrangoDemoTools;

class DemoCaseComponent {
    static get is() { return "o-demo-case"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "name": {
            "type": String,
            "attr": "name"
        }
    }; }
    static get style() { return ""; }
}

export { DemoCaseComponent as ODemoCase };
