import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'o-demo-bar',
  styleUrl: 'o-demo-bar.scss',
  shadow: true
})
export class DemoBarComponent {

  @Prop() first: string;
  @Prop() last: string;

  render() {
    return [
        <o-demo-bar-toolbar></o-demo-bar-toolbar>,
        <slot/>
    ];
  }
}
