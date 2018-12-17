const h = window.OrangoDemoTools.h;

class DemoCaseComponent {
    static get is() { return "o-demo-case"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "name": {
            "type": String,
            "attr": "name"
        }
    }; }
}

export { DemoCaseComponent as ODemoCase };
