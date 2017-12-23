import { Component, Prop ,Element} from '@stencil/core';
import {MDCSelect} from '@material/select';
@Component({
  tag: 'o-demo-bar-select',
  styleUrl: 'o-demo-bar-select.scss',
  shadow: false
})
export class DemoSelectComponent {

  private select:any;
  @Element() el: HTMLElement;
  @Prop() options: any;

  componentDidLoad() {
    const rootEl = this.el.querySelector('.mdc-select');
    this.select = new MDCSelect(rootEl);

    this.select.listen('MDCSelect:change', (evt) => {
          console.log(evt);
    });
   }
   componentDidUnload() {
    this.select.destroy();
  }

  render() {
    return (
      <div class="my-select-container">
      <div class="mdc-select" role="listbox" tabindex="0">
        <div class="mdc-select__surface">
          <div class="mdc-select__label">Select demo case</div>
          <div class="mdc-select__selected-text" />
          <div class="mdc-select__bottom-line" />
        </div>
        <div class="mdc-simple-menu mdc-select__menu">
          <ul class="mdc-list mdc-simple-menu__items">
            <li class="mdc-list-item" role="option" tabindex="0">
              Vegetables
            </li>
            <li class="mdc-list-item" role="option" tabindex="0">
              Fruit
            </li>
          </ul>
        </div>
      </div>
      </div>
    );
  }
}
