import { Component, h,Prop, Element,ComponentInterface} from '@stencil/core';
import { MDCSnackbar } from '@material/snackbar/index';

@Component({
  tag: 'o-demo-snackbar',
  styleUrl: 'o-demo-snackbar.scss',
  shadow: true
})
export class DemoSnackbarComponent implements ComponentInterface {
  public snackbarToast: any;

  @Element() el: HTMLElement;
  @Prop() events: any;

  componentDidLoad() {
    const rootEl = this.el.shadowRoot.querySelector('.mdc-snackbar');
    this.snackbarToast = new MDCSnackbar(rootEl);
    this.snackbarToast.dismissesOnAction = true;

    // Compute events if there is any event add eventListeners
    if (this._computeEvents()) {
      this._computeEvents().forEach(el => {
        window.addEventListener(
          el,
          evt => {
            const payload: object = {
              message: `${evt.type} : ${JSON.stringify(evt.detail)} `,
              actionText: 'Close',
              multiline: false,
              actionOnBottom: true,
              actionHandler: () => false
            };
            this.snackbarToast.show(payload);
          },
          false
        );
      });
    }
  }

  componentDidUnload() {
    this.snackbarToast.destroy();
    this._computeEvents().forEach(el => {
      window.removeEventListener(el, () => {}, true);
    });
  }

  _computeEvents() {
    return this.events && this.events !== ''  ? this.events.split(',') : false
  }

  render() {
    return (
      <div class="mdc-snackbar">
      <div class="mdc-snackbar__surface">
        <div class="mdc-snackbar__label"
             role="status"
             aria-live="polite">
          Can't send photo. Retry in 5 seconds.
        </div>
        <div class="mdc-snackbar__actions">
          <button type="button" class="mdc-button mdc-snackbar__action">Retry</button>
        </div>
      </div>
    </div>
    );
  }
}
