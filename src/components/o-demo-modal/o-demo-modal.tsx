import { Component,Prop, Element , Watch } from '@stencil/core';
import {MDCDialog} from '@material/dialog/index';
@Component({
  tag: 'o-demo-modal',
  styleUrl: 'o-demo-modal.scss',
  shadow: true
})
export class DemoModalComponent {
  public modalEl: any;

  @Element() el: HTMLElement;
  @Prop() open: boolean = false;
  @Prop() code: any = '';
  @Watch('open')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('Open:', newValue);
    if(newValue !== oldValue){
      const codeRoot:any = this.el.shadowRoot.querySelector('#my-dialog-content');
      newValue ? this.modalEl.open() : this.modalEl.close();
      monaco.editor.create(codeRoot), {
        value: [
          'function x() {',
          '\tconsole.log("Hello world!");',
          '}'
        ].join('\n'),
        language: 'javascript'
      };
    }
  }
  componentDidLoad() {
    const rootEl = this.el.shadowRoot.querySelector('.mdc-dialog');
    this.modalEl = new MDCDialog(rootEl);
  }

  render() {
    return (
      <div class="mdc-dialog">
   <div class="mdc-dialog__container">
     <div class="mdc-dialog__surface">
       <h2 class="mdc-dialog__title" id="my-dialog-title">
      Dialog Title
    </h2>
       <div class="mdc-dialog__content" id="my-dialog-content"/>
     </div>
   </div>
   <div class="mdc-dialog__scrim"/>
 </div>
    );
  }
}
