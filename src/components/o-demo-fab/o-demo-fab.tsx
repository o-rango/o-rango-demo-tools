import { Component, Element, Event, EventEmitter} from '@stencil/core';
import { MDCRipple } from '@material/ripple/index';
@Component({
  tag: 'o-demo-fab',
  styleUrl: 'o-demo-fab.scss',
  shadow: true
})

export class DemoFabComponent {
  private ripple: any;
  @Element() el: HTMLElement;
  @Event({ eventName: 'rotate-device' }) fabBtnRotate: EventEmitter;
  @Event({ eventName: 'change-device' }) fabBtnChangeDevice: EventEmitter;
  componentDidLoad() {
    const rootEl = this.el.shadowRoot.querySelector('.mdc-fab');
    this.ripple = MDCRipple.attachTo(rootEl);
  }

  componentDidUnload() {
    this.ripple.destroy();
  }

  showContextMenu():void{
     this.el.shadowRoot.querySelector('#fab-menu').classList.toggle('fab-menu--absolute--show')
  }

  handleClick(evt:any):void{
    const target  = evt.currentTarget.getAttribute('data-btn');
    target === 'rotate-screen' ? this.fabBtnRotate.emit(target)
                               : this.fabBtnChangeDevice.emit(target);
  }


  render() {
    return[
      <div id="fab-menu" class="fab-menu--absolute">
      <button
      data-btn="rotate-screen"
      onClick={(event: UIEvent) => this.handleClick(event)}
      id="rotate-screen" class="mdc-fab mdc-fab--mini material-icons">
      <span class="mdc-fab__icon">
      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
         <path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"/>
      </svg>
      </span>
      </button>

      <button
      data-btn="navigate-before"
      onClick={(event: UIEvent) => this.handleClick(event)}
      id="navigate-before" class="mdc-fab mdc-fab--mini material-icons app-fab--mini">
      <span class="mdc-fab__icon">
      <svg  height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>
      </span>
      </button>

      <button
      data-btn="navigate-next"
      onClick={(event: UIEvent) => this.handleClick(event)}
      id="navigate-next" class="mdc-fab mdc-fab--mini material-icons app-fab--mini">
      <span class="mdc-fab__icon">
      <svg  height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>
      </span>
      </button>
      </div>,

      <button
      data-btn="menu-toggle"
      onClick={() => this.showContextMenu()}
      class="mdc-fab material-icons app-fab--absolute">
      <span class="mdc-fab__icon">
      <svg  height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
      </span>
      </button>
    ]
  }
}
