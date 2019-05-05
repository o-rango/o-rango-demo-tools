import {
  Component, h,
  Prop,
  Element,
  Listen,
  ComponentInterface,
  State
} from '@stencil/core';
import { CssClassMap } from '../utils/CssClassMap';


const win = window as any;
const colors = {
  ORANGO: "#fd2b2b",
  WARN: '#f39c12',
  ERROR: '#c0392b',
  INFO: '#3498db'
}

const log = function (color, prefix, msg) {
  var styledPrefix = [
    '%c' + prefix,
    "background: " + color + "; color: white; padding: 4px 5px; border-radius: 3px; font-size: 0.9em;"
  ];
  console.log.apply(console, styledPrefix.concat([msg]));
}

@Component({
  tag: 'o-demo-bar',
  styleUrl: 'o-demo-bar.scss',
  shadow: true
})


export class DemoBarComponent implements ComponentInterface {
  private demoCases: any;
  private casesOptions: any;
  private resizeComponent: any;
  private codeEditor: any = '';
  private urlParams = new URLSearchParams(win.location.search);

  @Element() el: any;

  @Prop() name: string;
  @Prop() events: string = '';
  @Prop() backgroundColor: string;
  @Prop({ mutable: true }) caseOptionSelected: number = 0;
  @Prop({ mutable: true }) pattern: boolean = true;
  @Prop({ mutable: true }) device: string = 'desktop';
  @Prop({ mutable: true }) deviceSize: string = '1024';
  @State() showResizer: boolean = false;
  @State() fullScreen = false;

  // LifeCycle Hooks
  componentWillLoad() {
    document.body.style.margin = '0';
    this.demoCases = this.el.querySelectorAll('o-demo-case');
    this.casesOptions = this._setSelect();
    this.fullScreen = this.urlParams.has('fullscreen');
  }

  componentDidLoad() {
    if (!this.fullScreen) {
      this.resizeComponent = this.el.shadowRoot.querySelector('o-demo-resizer');
      this._setIframe();
      this.setViewPort();
    } else {
      let caseSel: any = sessionStorage.getItem('o-demo-key') ? sessionStorage.getItem('o-demo-key') : 0;
      this.caseOptionSelected = parseInt(caseSel);
    }
    this.stencilDevServer();
  }


  componentDidUpdate() {
    this.setViewPort();
  }

  // Utils
  setViewPort(): void {
    if (!this.fullScreen) {
      win.requestAnimationFrame(() => this.resizeComponent.setActiveViewPort(this.deviceSize));
    }
  }

  stencilDevServer() {

    if ("WebSocket" in win && win['s-dev-server']) {
      const ws = new WebSocket(`ws://localhost:${win.location.port}/`);


      ws.onopen = () => {
        log(colors.ORANGO, 'Server', 'Connected Stencil HMR');
        this._setIframe();
      };

      ws.onmessage = (message) => {
        var msg = JSON.parse(message.data);
        if (msg.buildLog) {
          log(colors.INFO, 'Build Status', ':::::::: Updating ::::::::');
          msg.buildLog.messages.forEach((msgContent) => {
            console.log(msgContent);
          });
          this.el.forceUpdate();
          return;
        }
      };
    };
  }

  @Listen('code-editor-changed')
  codeEditorChangedHandler(event: CustomEvent) {
    console.log('code', event.detail);
    this._setIframe(event.detail)
  }

  @Listen('selectedCaseChanged')
  selectedCaseChangedHandler(event: CustomEvent) {
    this.caseOptionSelected = event.detail;
    this._setIframe();
  }

  @Listen('toolbarButtonClicked')
  toolbarButtonClickedHandler(event: CustomEvent) {
    switch (event.detail) {
      case 'code-editor':
        this.device = 'editor';
        this.deviceSize = '800';
        this.showResizer = true;
        break;
      case 'launch-window':
        this._launchWindow();
        break;
      case 'mobile':
        this.device = event.detail;
        this.deviceSize = '412';
        this.showResizer = false;
        break;
      case 'desktop':
        this.device = event.detail;
        this.deviceSize = '1024';
        this.showResizer = false;
        break;
      case 'other-devices':
        this.device = event.detail;
        this.deviceSize = '458';
        this.showResizer = true;
        break;
    }
    this._setIframe();
  }


  @Listen('resizeButtonClicked')
  resizeButtonClickedHandler(event: CustomEvent) {
    this.el.shadowRoot.querySelector('iframe').width = event.detail;
    this.deviceSize = event.detail;
  }

  _launchWindow() {
    this.urlParams.has('fullscreen') ? false : this.urlParams.set("fullscreen", "true");
    win.location.search = this.urlParams.toString();
  }

  _setSelect() {
    return Array.from(this.demoCases).map(function (item: any) {
      return item.getAttribute('name');
    });
  }

  _cleanIframe() {
    const oldFrame = this.el.shadowRoot.querySelector('iframe');
    if (oldFrame) {
      oldFrame.remove();
    }
  }

  _setIframe(code?: string) {
    win.requestAnimationFrame(() => {
      this._cleanIframe();
      const iframeContainer = this.el.shadowRoot.querySelector('#iframeContainer');
      //Custom BackGround Color
      if (this.backgroundColor) { iframeContainer.style.backgroundColor = this.backgroundColor };

      const iframe = document.createElement('iframe');
      const frameH = Math.max(document.documentElement.clientHeight);
      const frameW = this.fullScreen ? '100%' : `${this.deviceSize.toString()}px`;;
      const style = this.fullScreen ? `body{margin:0;` : `body{margin:0;}`;
      const htmlContent = code ? code : this.demoCases[this.caseOptionSelected].querySelector('template').innerHTML;
      this.codeEditor = htmlContent;
      // TODO use different way to set content to improve perf
      const html = code ? code : `<html><head></head><style>${style}</style><body unresolved ontouchstart id="frameBody">${htmlContent}</body></html>`;
      iframe.height = `${frameH.toString()}px`;
      iframe.width = frameW
      iframe.style.border = 'none';
      iframeContainer.appendChild(iframe)
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(html);
      iframe.contentWindow.document.close();
    });
  }

  // Partials View Functions
  defaultView() {
    return [<div id="iframeContainer" class="defaultView" />];
  }

  mobileView() {
    return [<o-demo-fab />, <o-demo-devices><div id="iframeContainer" class="pattern" slot="screen" /></o-demo-devices>];
  }

  fullscreenView() {
    return [<o-demo-fab close />, <div id="iframeContainer" />]
  }

  codeEditorView() {
    return [
    <div class='code-wrapper'>
      <div class='row'>
        <div class='column'>
          <div id="iframeContainer" />
        </div>
        <div class='column'>
          <o-demo-editor code={this.codeEditor}></o-demo-editor>
        </div>
      </div>
    </div>]
  }

  viewComposer(){
      return this.device === 'editor' ? this.codeEditorView() 
                                      : this.mobileView();
  }

  mainView() {
    const bgClasses: CssClassMap = { pattern: this.pattern && !this.showResizer }
    const deviceClasses: CssClassMap = { hide: this.showResizer }
    return (<div id="demo-bar">
      {this.events.length !== 0 ? <o-demo-snackbar events={this.events} /> : null}
      <o-demo-bar-toolbar name={this.name}>
        <o-demo-bar-select slot="center" options={this.casesOptions} />
        <o-demo-bar-buttons slot="right" />
        <o-demo-resizer class={deviceClasses} size={this.deviceSize} viewport={this.device} slot="base" />
      </o-demo-bar-toolbar>
      <div id="frame-wrap" class={bgClasses}>
        { 
        }
        {this.showResizer ? this.viewComposer() : this.defaultView()}
      </div>
    </div>)
  }

  render() {
    return this.fullScreen ? this.fullscreenView() : this.mainView();
  }
}


