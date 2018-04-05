import { Component, Prop, Element, Event,EventEmitter} from '@stencil/core';
import { MDCSelect } from '@material/select';
@Component({
  tag: 'o-demo-bar-select',
  styleUrl: 'o-demo-bar-select.scss',
  shadow: true
})
export class DemoSelectComponent {
  private select: any;
  @Element() el: HTMLElement;
  @Event() selectedCaseChanged: EventEmitter;
  @Prop() options: any;

  componentDidLoad() {
    const rootEl = this.el.shadowRoot.querySelector('.mdc-select');
    this.select = new MDCSelect(rootEl);
    this.select.selectedIndex = 0;

    this.select.listen('MDCSelect:change', evt => {
      this.selectedCaseChanged.emit(evt.detail.value);
     });
  }
  componentDidUnload() {
    this.select.destroy();
  }

  render() {
    return (
<div class="mdc-select">
  <select class="mdc-select__native-control">
      {this.options.map((option , index) => (
                <option class="mdc-list-item" id={index} role="option" tabindex="0">
                  {option}
                </option>
              ))}
  </select>
  <div class="mdc-select__label mdc-select__label--float-above">Pick a Food Group</div>
  <div class="mdc-select__bottom-line"></div>
</div>
    );
  }
}


