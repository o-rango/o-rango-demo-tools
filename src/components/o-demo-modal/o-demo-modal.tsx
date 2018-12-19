import { Component, Prop, Element, Method,Event, EventEmitter } from '@stencil/core';
import {MDCDialog} from '@material/dialog/index';

@Component({
  tag: 'o-demo-modal',
  styleUrl: 'o-demo-modal.scss',
  shadow: true
})
export class DemoModalComponent {
  public modalEl: any;

  @Element() el: HTMLElement;
  @Event({ eventName: 'code-editor-changed' })codeEditorChanged : EventEmitter;
  @Prop({ mutable: true, reflectToAttr: true }) open: boolean = false;
  @Prop() code: any = '';

  debounce(delay, fn) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }

  //@Listen('editor-content')
  contentChanged(arg){
    console.log('debounceing')
    this.codeEditorChanged.emit(arg.code);
    //this.debounce(100 , this.codeEditorChanged.emit(arg.code))
  }

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
      <h2 class="mdc-dialog__title" id="my-dialog-title">Code Editor</h2>
      <div class="mdc-dialog__content" id="my-dialog-content">
      Hola <div id="id-modal"/>
      </div>
      <footer class="mdc-dialog__actions">
        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">close</button>
      </footer>
    </div>
  </div>
  <div class="mdc-dialog__scrim"/>
      </div>
    );
  }
}
