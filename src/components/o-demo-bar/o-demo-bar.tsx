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
  private resizeComponent:any;
  @Element() el: any;

  @Prop() name: string;
  @Prop() events: string;
  @Prop() backgroundColor: string;
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
    this._setIframe();
    this.setViewPort();
  }

  componentDidUpdate() {
    this._setIframe();
    this.setViewPort();
  }

  // Utils
  setViewPort():void{
    window.requestAnimationFrame(() => this.resizeComponent.setActiveViewPort(this.deviceSize));
  }



  @Listen('selectedCaseChanged')
  selectedCaseChangedHandler(event: CustomEvent) {
    this.caseOptionSelected = event.detail;
  }

  @Listen('toolbarButtonClicked')
  toolbarButtonClickedHandler(event: CustomEvent) {
    switch (event.detail) {
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
        this.el.forceUpdate();
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
    window.requestAnimationFrame(()=>{
      this._cleanIframe();
      const  iframeContainer =  this.el.shadowRoot.querySelector('#iframeContainer');
      const iframe = document.createElement('iframe');
      const frameH = Math.max(document.documentElement.clientHeight);
      const frameW = this.deviceSize;
      const htmlContent = this.demoCases[this.caseOptionSelected].querySelector('template').innerHTML;
      const html = `<html><head></head><style>body{margin:0}</style><body unresolved ontouchstart id="frameBody">${htmlContent}</body></html>`;
      iframe.height = `${(frameH - 85).toString()}px`;
      iframe.width = `${frameW.toString()}px`;
      iframe.style.border = 'none';
      iframeContainer.appendChild(iframe)
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(html);
      iframe.contentWindow.document.close();
    });
  }

  render() {

    const bgClasses: CssClassMap = { pattern : this.pattern && !this.deviceEmulate}
    const deviceClasses: CssClassMap = { hide: this.deviceEmulate }

    // Templates for default view or Mobile View
    const defaultView = [<div id="iframeContainer"  class="defaultView"/>];
    const mobileView = [ <o-demo-fab/>,<o-demo-devices><div id="iframeContainer" class="pattern" slot="screen"/></o-demo-devices>];

    return (
      <div id="demo-bar">
        {this.events.length !== 0 ? <o-demo-snackbar events={this.events} /> : null}
        <o-demo-bar-toolbar name={this.name}>
          <o-demo-bar-select slot="center" options={this.casesOptions} />
          <o-demo-bar-buttons slot="right"/>
        <o-demo-resizer class={deviceClasses} size={this.deviceSize} viewport={this.device} slot="base"/>
        </o-demo-bar-toolbar>
        <div id="frame-wrap" class={bgClasses}>
           { this.deviceEmulate ? mobileView : defaultView}
        </div>
      </div>
    );
  }
}
