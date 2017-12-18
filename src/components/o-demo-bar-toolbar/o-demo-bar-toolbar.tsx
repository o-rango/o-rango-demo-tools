import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'o-demo-bar-toolbar',
  styleUrl: 'o-demo-bar-toolbar.scss',
  shadow: false
})
export class DemoToolbarComponent {

  @Prop() first: string;
  @Prop() last: string;

  render() {
    return (
      <div>
        Demo Toolbar
      </div>
    );
  }
}
