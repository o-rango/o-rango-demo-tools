import { Component, Prop, Element } from '@stencil/core';
import { MDCToolbar } from '@material/toolbar';

@Component({
  tag: 'o-demo-bar-toolbar',
  styleUrl: 'o-demo-bar-toolbar.scss',
  shadow: true
})
export class DemoToolbarComponent {

  @Element() el: HTMLElement;
  @Prop() name: string;
  @Prop() options: any;
  toolbar: any;
  rootEl: any;

  componentDidLoad() {
    this.rootEl = this.el.shadowRoot.querySelector('.mdc-toolbar');
    this.toolbar = new MDCToolbar(this.rootEl);
    this.toolbar.fixedAdjustElement = this.el.shadowRoot.querySelector(
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
            <section id="left-panel" class="mdc-toolbar__section mdc-toolbar__section--align-start">
              <h3 class="mdc-typography--subheading2">{this.name}</h3>
              <slot name="left" />
            </section>
            <section id="center-panel" class="mdc-toolbar__section">
              <slot name="center" />
            </section>
            <section
              id="right-panel"
              class="mdc-toolbar__section mdc-toolbar__section--align-end"
              role="toolbar"
            >
              <slot name="right" />
            </section>
          </div>
          <slot name="base" />
        </header>
        <main class="mdc-toolbar-fixed-adjust"/>
      </div>
    );
  }
}
