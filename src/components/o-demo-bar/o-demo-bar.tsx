import {
  Component,
  Prop,
  Element,
  Listen,
  Watch
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
  private resizeComponent:any;
  @Element() el: HTMLElement;

  @Prop() name: string;
  @Prop() events: string[];
  @Prop({ mutable : true}) caseOptionSelected : number = 0;
  @Prop({ mutable: true }) pattern: boolean = true;
  @Prop({ mutable: true }) device: string = 'desktop';
  @Prop({ mutable: true }) deviceSize: string = '1024';
  @Prop({ mutable: true }) deviceEmulate: boolean = false;

  // LifeCycle Hooks
  componentWillLoad() {
    document.body.style.margin = '0';
    this.demoCases = this.el.querySelectorAll('o-demo-case');
    this.casesOptions = this._setSelect();
  }

  componentDidLoad() {
    this.resizeComponent = this.el.shadowRoot.querySelector('o-demo-resizer');
    //this._setIframe();
    //this.setViewPort();
  }

  // Utils
  setViewPort():void{
    window.requestAnimationFrame(() => this.resizeComponent.setActiveViewPort(this.deviceSize));
  }

  // Select Changes handlers
  @Watch('caseOptionSelected')
  caseOptionSelectedHandler():void{
      this._setIframe();
  }

  @Listen('selectedCaseChanged')
  selectedCaseChangedHandler(event: CustomEvent) {
    this.caseOptionSelected = event.detail;
  }

  @Listen('toolbarButtonClicked')
  toolbarButtonClickedHandler(event: CustomEvent) {
    switch (event.detail) {
      case 'grid-pattern':
        this.pattern = !this.pattern;
        this.deviceEmulate = false;
        break;
      case 'mobile':
      this.device = event.detail;
      this.deviceSize = '412';
      this.deviceEmulate = false;
        break;
      case 'desktop':
      this.device = event.detail;
      this.deviceSize = '1024';
      this.deviceEmulate = false;
        break;
      case 'other-devices':
      this.device = event.detail;
      this.deviceSize = '458';
      this.deviceEmulate = true;
      break;
    }
    this._setIframe();

    if(event.detail !== 'other-devices'){
      setTimeout(()=>{
        this.setViewPort();
      } , 20);
    }
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
    const  htmlReplacer =  this.el.shadowRoot.querySelector('#frame-wrap');

    !this.deviceEmulate ? htmlReplacer.innerHTML = `<div id="iframeContainer" class="pattern" />`
                        : htmlReplacer.innerHTML = '<o-demo-devices><div id="iframeContainer" class="pattern" slot="screen"></div></o-demo-devices>'

    const  iframeContainer =  this.el.shadowRoot.querySelector('#iframeContainer');
    const iframe = document.createElement('iframe');
    const frameH = Math.max(document.documentElement.clientHeight);
    const frameW = this.deviceSize;
    const htmlContent = this.demoCases[this.caseOptionSelected].querySelector('template').innerHTML;
    const html = `<html><head></head><style>body{ margin:0} </style></style><body unresolved ontouchstart id="frameBody">${htmlContent}</body></html>`;
    iframe.height = `${(frameH - 85).toString()}px`;
    iframe.width = `${frameW.toString()}px`;
    iframeContainer.appendChild(iframe)
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
  }

  render() {

    const bgClasses: CssClassMap = {
      hide: this.deviceEmulate,
    };

    return (
      <div id="demo-bar">
        { this.events ? <o-demo-snackbar events={this.events} /> : null }
        <o-demo-bar-toolbar name={this.name}>
          <o-demo-bar-select slot="center" options={this.casesOptions} />
          <o-demo-bar-buttons slot="right"/>
        <o-demo-resizer class={bgClasses} size={this.deviceSize} viewport={this.device} slot="base"/> }
        </o-demo-bar-toolbar>
        <div id="frame-wrap">
        </div>
      </div>
    );
  }
}
