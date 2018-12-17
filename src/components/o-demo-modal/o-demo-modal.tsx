import { Component, Prop, Element, Method } from '@stencil/core';
import {MDCDialog} from '@material/dialog/index';

import '@granite-elements/ace-widget/ace-widget.js';
//import 'ace-builds/src-noconflict/theme-chrome'
//import 'ace-builds/src-noconflict/mode-html';
@Component({
  tag: 'o-demo-modal',
  styleUrl: 'o-demo-modal.scss',
  shadow: true
})
export class DemoModalComponent {
  public modalEl: any;

  @Element() el: HTMLElement;
  @Prop({ mutable: true, reflectToAttr: true }) open: boolean = false;
  @Prop() code: any = '';

  @Method()
  openDialog(): void {
    if (!this.open) {
      this.modalEl.open();
      this.open = true;
    }
  }

  @Method()
  closeDialog(): void {
    if (this.open) {
      this.modalEl.close();
      this.open = false;
    }
  }

  componentDidLoad() {
    const rootEl = this.el.shadowRoot.querySelector('.mdc-dialog');

    this.modalEl = new MDCDialog(rootEl);

    this.modalEl.listen('MDCDialog:opened', ()=>{
      this.open = true;
    });

    this.modalEl.listen('MDCDialog:closing', ()=> {
      this.open = false;
    });
  }

  componentDidUnload() {
    this.modalEl.destroy();
  }

  render() {
    return (
      <div
        class="mdc-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-dialog-title"
        aria-describedby="my-dialog-content"
      >
        <div class="mdc-dialog__container">
          <div class="mdc-dialog__surface">
            <h4 class="mdc-dialog__title" id="my-dialog-title">
              Code Editor
            </h4>
            <div class="mdc-dialog__content" id="my-dialog-content">
            <ace-widget baseUrl="/o-rango-demo-tools/ace/"  mode="ace/mode/html" theme="ace/theme/chrome" value={this.code} initial-focus={true}/>
          </div>
          </div>
        </div>
        <div class="mdc-dialog__scrim" />
      </div>
    );
  }
}
