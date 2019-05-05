import { Component, h,Prop, Element,ComponentInterface} from '@stencil/core';

@Component({
  tag: 'o-demo-editor',
  styleUrl: 'o-demo-editor.scss',
  shadow: true
})
export class DemoEditorComponent implements ComponentInterface {

  @Element() el: HTMLElement;
  @Prop() code : string;

  componentDidUnload() {
   console.log(this.el);
  }

  render() {
    return (
      <code>{this.code}</code>
    );
  }
}
