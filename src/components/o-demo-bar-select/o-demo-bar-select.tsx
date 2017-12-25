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
      <div>
        <div class="mdc-select" role="listbox">
          <div class="mdc-select__surface" tabindex="0">
            <div class="mdc-select__label  mdc-select__label--float-above">Demo case</div>
            <div class="mdc-select__selected-text" />
            <div class="mdc-select__bottom-line" />
          </div>
          <div class="mdc-simple-menu mdc-select__menu">
            <ul class="mdc-list mdc-simple-menu__items">
            {this.options.map((option , index) => (
                <li class="mdc-list-item" id={index} role="option" tabindex="0">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
