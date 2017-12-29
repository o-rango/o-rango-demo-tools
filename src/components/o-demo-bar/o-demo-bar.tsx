import {
  Component,
  Prop,
  Element,
  Listen,
  CssClassMap,
  State
} from '@stencil/core';

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
    this._setIframe();
  }

  @Listen('toolbarButtonClicked')
  toolbarButtonClickedHandler(event: CustomEvent) {
    switch (event.detail) {
      case 'grid-pattern':
        this.pattern = !this.pattern;
        break;
      default:
        this.device = event.detail;
        this.deviceSize = event.detail === 'mobile' ? '412' : '1024';
        this._setIframe();
        break;
    }
  }

  @Listen('selectedCaseChanged')
  selectedCaseChangedHandler(event: CustomEvent) {
    this.caseOptionSelected = event.detail;
    this._setIframe();
  }

  @Listen('resizeButtonClicked')
  resizeButtonClickedHandler(event: CustomEvent) {
    this.deviceSize =  event.detail;
    this.el.shadowRoot.querySelector('iframe').width = this.deviceSize;
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
    const frameW = this.deviceSize;
    let html = this.demoCases[this.caseOptionSelected].innerHTML;
    // Optional Script Includes tags
    html = `<html><head></head><body ontouchstart id="frameBody">${html}</body></html>`
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
