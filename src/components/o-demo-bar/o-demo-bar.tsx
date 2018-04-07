import {
  Component,
  Prop,
  Element,
  Listen
} from '@stencil/core';
import {CssClassMap} from '../utils/CssClassMap'

@Component({
  tag: 'o-demo-bar',
  styleUrl: 'o-demo-bar.scss',
  shadow: true
})

export class DemoBarComponent {
  private demoCases: any;
  private casesOptions: any;
  private caseOptionSelected: number = 0;
  private resizeComponent:any;
  @Element() el: HTMLElement;

  @Prop() name: string;
  @Prop() events: string[];
  @Prop({ mutable: true }) pattern: boolean = true;
  @Prop({ mutable: true }) device: string = 'desktop';
  @Prop({ mutable: true }) deviceSize: string = '1024';




  componentWillLoad() {
    document.body.style.margin = '0';
    this.demoCases = this.el.querySelectorAll('o-demo-case');
    this.casesOptions = this._setSelect();
  }

  componentDidLoad() {
    this.resizeComponent = this.el.shadowRoot.querySelector('o-demo-resizer');
    this._setIframe();
    this.resizeComponent.setActiveViewPort(this.deviceSize);
  }

  @Listen('toolbarButtonClicked')
  toolbarButtonClickedHandler(event: CustomEvent) {
    switch (event.detail) {
      case 'grid-pattern':
        this.pattern = !this.pattern;
        break;
      case 'mobile':
      this.device = event.detail;
      this.deviceSize = '412';
        break;
      case 'desktop':
      this.device = event.detail;
      this.deviceSize = '1024';
        break;
    }
    this._setIframe();
    setTimeout(()=>{
      this.resizeComponent.setActiveViewPort(this.deviceSize);
    } , 0);
  }

  @Listen('selectedCaseChanged')
  selectedCaseChangedHandler(event: CustomEvent) {
    this.caseOptionSelected = event.detail;
    this._setIframe();
  }

  @Listen('resizeButtonClicked')
  resizeButtonClickedHandler(event: CustomEvent) {
    this.el.shadowRoot.querySelector('iframe').width = event.detail;
    this.deviceSize =  event.detail;
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
    iframe.frameBorder = "0"
    const frameH = Math.max(document.documentElement.clientHeight);
    const frameW = this.deviceSize;
    const htmlContent = this.demoCases[this.caseOptionSelected].querySelector('template').innerHTML;
    const html = `<html><head></head><body unresolved ontouchstart id="frameBody">${htmlContent}</body></html>`
      .replace(/<!--includes/g, '')
      .replace(/includes-->/g, '');

    iframe.height = `${(frameH - 85).toString()}px`;
    iframe.width = `${frameW.toString()}px`;
    iframeContainer.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
  }

  render() {
    const bgClasses: CssClassMap = {
      pattern: this.pattern,
      bgcolor: !this.pattern
    };
    return (
      <div id="demo-bar">
        {this.events ? <o-demo-snackbar events={this.events} /> : ''}
        <o-demo-bar-toolbar name={this.name}>
          <o-demo-bar-select slot="center" options={this.casesOptions} />
          <o-demo-bar-buttons slot="right" />
          <o-demo-resizer
            size={this.deviceSize}
            viewport={this.device}
            slot="base"
          />
        </o-demo-bar-toolbar>
        <div id="frame-wrap">
          <div id="iframeContainer" class={bgClasses} />
        </div>
      </div>
    );
  }
}
