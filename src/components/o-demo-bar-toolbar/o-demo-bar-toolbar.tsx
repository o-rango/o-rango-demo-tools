import { Component, Prop,Element} from '@stencil/core';
import {MDCToolbar} from '@material/toolbar';

@Component({
  tag: 'o-demo-bar-toolbar',
  styleUrl: 'o-demo-bar-toolbar.scss',
  shadow: false
})
export class DemoToolbarComponent {

  private toolbar:any;
  @Element() el: HTMLElement;
  @Prop() events: string;
  @Prop() name: string;
  @Prop() description: string;


  componentDidLoad() {
    const rootEl = this.el.querySelector('.mdc-toolbar');
    this.toolbar = new MDCToolbar(rootEl);
    this.toolbar.fixedAdjustElement = this.el.querySelector('.mdc-toolbar-fixed-adjust');
  }

  componentDidUnload() {
    this.toolbar.destroy();
  }

  render() {
    return (
      <div class="mdc-typography">
        <header class="mdc-toolbar mdc-toolbar--fixed">
          <div class="mdc-toolbar__row">
            <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
              <h3 class="mdc-typography--subheading2">{this.name}</h3>
            </section>
            <section class="mdc-toolbar__section">
            <o-demo-bar-select/>
            </section>
            <section class="mdc-toolbar__section mdc-toolbar__section--align-end">
            <i class="material-icons">smartphone</i>
            <i class="material-icons">laptop_chromebook</i>
            </section>
          </div>
        </header>
        <main class="mdc-toolbar-fixed-adjust">
          <p class="demo-paragraph">
            <slot/>
          </p>
        </main>
      </div>
    );
  }
}
