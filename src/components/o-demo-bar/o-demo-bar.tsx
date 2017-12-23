import { Component, Prop , Element } from '@stencil/core';


@Component({
  tag: 'o-demo-bar',
  styleUrl: 'o-demo-bar.scss',
  shadow: true
})
export class DemoBarComponent {

  private demoCases : any;
  @Element() el: HTMLElement;
  @Prop() name: string;
  @Prop() last: string;

  componentWillLoad() {
    // Get inner demo cases props :
    this.demoCases = this.el.querySelectorAll('o-demo-case');
  };

  componentDidLoad() {
    const iframeContainer = this.el.shadowRoot.querySelector('#iframeContainer');
    const iframe = document.createElement('iframe');
    let html = this.demoCases[0].innerHTML;
    html = html.replace(/=""/g, '').replace(/="{/g, '=\'{').replace(/}"/g, '}\'').replace(/="\[/g, '=\'\[').replace(/\]"/g, '\]\'').replace(/&quot;/g, '\"').replace(/='\[\[/g, '=\"\[\[').replace(/\]\]\'/g, '\]\]\"').replace(/='\{\{/g, '=\"\{\{').replace(/\}\}\'/g, '\}\}\"');
    html = '<html><head></head><body style=`width=${window.innerWidth}; height:${window.innerHeight};` ontouchstart id="frameBody">' + html + '</body></html>';
    iframeContainer.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
  }


  render() {
    return (
      <div id="demo-bar">
      <o-demo-bar-toolbar name={this.name}/>
        <div id="frame-wrap">
        <div id="iframeContainer"/>
        </div>
      </div>
    );
  }
}
