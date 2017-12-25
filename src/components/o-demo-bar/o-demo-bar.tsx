import { Component, Prop, Element, Listen ,CssClassMap} from '@stencil/core';

@Component({
  tag: 'o-demo-bar',
  styleUrl: 'o-demo-bar.scss',
  shadow: true
})
export class DemoBarComponent {
  private demoCases: any;
  private casesOptions: any;
  private caseOptionSelected: number = 0;
  @Element() el: HTMLElement;
  @Prop() name: string;
  @Prop() pattern: boolean = true;
  @Prop() events: string[];

  componentWillLoad() {
    this.demoCases = this.el.querySelectorAll('o-demo-case');
    this.casesOptions = this._setSelect();
  }

  componentDidLoad() {
    this._setIframe();
  }


  @Listen('toolbarButtonClicked')
  toolbarButtonClickedHandler(event: CustomEvent) {
    console.log('Click button : ', event.detail)
    //TODO Handle click on toolbar buttons event.detail
  }

  @Listen('selectedCaseChanged')
  selectedCaseChangedHandler(event: CustomEvent) {
    this.caseOptionSelected = event.detail;
    this._setIframe();
  }

  _setSelect() {
    return Array.from(this.demoCases).map(function(item: any) {
      return item.getAttribute('name');
    });
  }

  _cleanIframe() {
    const oldFrame = this.el.shadowRoot.querySelector('iframe');
    if (oldFrame) {
      oldFrame.remove();
    }
  }

  _setIframe() {
    this._cleanIframe();
    const iframeContainer = this.el.shadowRoot.querySelector(
      '#iframeContainer'
    );
    const iframe = document.createElement('iframe');
    const frameH = Math.max(document.documentElement.clientHeight);
    let html = this.demoCases[this.caseOptionSelected].innerHTML;
    html = `<html><head></head><body ontouchstart id="frameBody">${html}</body></html>`;

    iframe.height = (frameH - 85).toString();
    iframeContainer.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
  }

  render() {
    const bgClasses : CssClassMap = {
      'pattern' : this.pattern
    }
    return (
      <div id="demo-bar">
        <o-demo-snackbar events={this.events}/>
        <o-demo-bar-toolbar name={this.name}>
          <o-demo-bar-select slot="center" options={this.casesOptions} />
          <o-demo-bar-buttons slot="right" />
        </o-demo-bar-toolbar>
        <div id="frame-wrap" class={bgClasses}>
          <div id="iframeContainer" />
        </div>
      </div>
    );
  }
}
