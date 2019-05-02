import {
  Component, h,
  Prop,
  Element,
  Listen,
  ComponentInterface,
  State
} from '@stencil/core';
import { CssClassMap } from '../utils/CssClassMap'
const win = window as any;
const colors = {
  ORANGO: "#fd2b2b",
  WARN: '#f39c12',
  ERROR: '#c0392b',
  INFO: '#3498db'
}

/*
const FAVICONS = {
  IDLE: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAFAAUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDoKKKK+LPrD//Z",
  WORKING: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAFAAUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC3RRRXgnlH/9k=",
}
*/

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
  @Prop({ mutable: true }) deviceEmulate: boolean = false;
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
    this._setIframe();
    this.setViewPort();
  }

  // Utils
  setViewPort(): void {
    if (!this.fullScreen) {
      win.requestAnimationFrame(() => this.resizeComponent.setActiveViewPort(this.deviceSize));
    }
  }

  stencilDevServer() {

    /*
        var fav : any;
    if(!doc.querySelector("link[rel='shortcut icon']")) {
      var linkElm: any = doc.createElement('link');
      linkElm.rel = 'shortcut icon';
      linkElm.href = FAVICONS.WORKING;
      doc.head.appendChild(linkElm);
    }else{
      fav = doc.querySelector("link[rel='shortcut icon']");
    }

    */

    if ("WebSocket" in win && win['s-dev-server']) {
      const ws = new WebSocket(`ws://localhost:${win.location.port}/`);
    
    
      ws.onopen = () => {
        log(colors.ORANGO, 'Server', 'Connected Stencil HMR');
        this._setIframe();
        setTimeout(() => {
          this.el.forceUpdate();
        }, 20);
      };

      ws.onmessage = (message) => {
        var msg = JSON.parse(message.data);
        if (msg.buildLog) {
          log(colors.INFO, 'Build Status', ':::::::: Updating ::::::::');
          msg.buildLog.messages.forEach((msgContent)=>{
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
  }

  @Listen('toolbarButtonClicked')
  toolbarButtonClickedHandler(event: CustomEvent) {
    switch (event.detail) {
      case 'code-editor':
        this.el.shadowRoot.querySelector('#modal-id').openDialog();
        document.addEventListener('on-editor-content', () => { console.log(this.codeEditor) })
        break;
      case 'launch-window':
        this._launcWindow();
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

    if (event.detail !== 'other-devices') {
      setTimeout(() => {
        this.el.forceUpdate();
        this.setViewPort();
      }, 20);
    }
  }


  @Listen('resizeButtonClicked')
  resizeButtonClickedHandler(event: CustomEvent) {
    this.el.shadowRoot.querySelector('iframe').width = event.detail;
    this.deviceSize = event.detail;
  }

  _launcWindow() {
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
      const iframe = document.createElement('iframe');
      const frameH = Math.max(document.documentElement.clientHeight);
      const frameW = this.fullScreen ? '100%' : `${this.deviceSize.toString()}px`;;
      const style = this.fullScreen ? `body{margin:0;` : `body{margin:0;}`;
      const htmlContent = code ? code : this.demoCases[this.caseOptionSelected].querySelector('template').innerHTML;
      // TODO use different way to set content to improve perf
      const html = code ? code : `<html><head></head><style>${style}</style><body unresolved ontouchstart id="frameBody">${htmlContent}</body></html>`;
      iframe.height = `${frameH.toString()}px`;
      iframe.width = frameW
      iframe.style.border = 'none';
      iframeContainer.appendChild(iframe)
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(html);
      iframe.contentWindow.document.close();
      this.codeEditor = html;
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

  mainView() {
    const bgClasses: CssClassMap = { pattern: this.pattern && !this.deviceEmulate }
    const deviceClasses: CssClassMap = { hide: this.deviceEmulate }
    return (<div id="demo-bar">
      {this.events.length !== 0 ? <o-demo-snackbar events={this.events} /> : null}
      <o-demo-bar-toolbar name={this.name}>
        <o-demo-bar-select slot="center" options={this.casesOptions} />
        <o-demo-bar-buttons slot="right" />
        <o-demo-resizer class={deviceClasses} size={this.deviceSize} viewport={this.device} slot="base" />
      </o-demo-bar-toolbar>
      <div id="frame-wrap" class={bgClasses}>
        {this.deviceEmulate ? this.mobileView() : this.defaultView()}
      </div>
    </div>)
  }

  render() {
    return this.fullScreen ? this.fullscreenView() : this.mainView();
  }
}


