import {Component, Prop, Element, Event, EventEmitter} from '@stencil/core';
import {MDCSelect} from '@material/select/index';
@Component({
    tag: 'o-demo-bar-select',
    styleUrl: 'o-demo-bar-select.scss',
    shadow: true
  })

export class DemoSelectComponent {
  private select : any;
  @Element()el : HTMLElement;
  @Event()selectedCaseChanged : EventEmitter;
  @Prop()options : any;

  componentDidLoad() {
    const rootEl = this.el.shadowRoot.querySelector('.mdc-select');
    this.select = new MDCSelect(rootEl);
    this.select.selectedIndex = sessionStorage.getItem('o-demo-key') <= this.options.length ? sessionStorage.getItem('o-demo-key') :0;
    this.emitChange();
    this.select.listen('change', () => {
        this.emitChange();
    });
  }

  emitChange(){
    document.title = this.options[this.select.selectedIndex];
    sessionStorage.setItem('o-demo-key' , this.select.selectedIndex);
    this.selectedCaseChanged.emit(this.select.selectedIndex);
  }

  componentDidUnload() {
    this.select.destroy();
  }

  render() {
    return (
      <div class="mdc-select">
      <select class="mdc-select__native-control">
      {this.options.map((option, index) => (
                    <option value={index} id={index} role="option" tabindex="0">
                      {option}
                    </option>
                  ))}
      </select>
      <label class="mdc-floating-label">Select Demo:</label>
      <div class="mdc-line-ripple"></div>
    </div>
    );
  }
}
