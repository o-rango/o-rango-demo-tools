import { Component, Prop, Element } from '@stencil/core';
import { MDCToolbar } from '@material/toolbar';

@Component({
  tag: 'o-demo-bar-toolbar',
  styleUrl: 'o-demo-bar-toolbar.scss',
  shadow: false
})
export class DemoToolbarComponent {
  private toolbar: any;
  @Element() el: HTMLElement;
  @Prop() name: string;
  @Prop() options: any;

  componentDidLoad() {
    const rootEl = this.el.querySelector('.mdc-toolbar');
    this.toolbar = new MDCToolbar(rootEl);
    this.toolbar.fixedAdjustElement = this.el.querySelector(
      '.mdc-toolbar-fixed-adjust'
    );
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
              <slot name="left"/>
            </section>
            <section class="mdc-toolbar__section">
            <slot name="center"/>
            </section>
            <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
            <slot name="right"/>
            </section>
          </div>
        </header>
      </div>
    );
  }
}
