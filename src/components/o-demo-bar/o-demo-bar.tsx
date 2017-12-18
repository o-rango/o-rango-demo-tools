import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'o-demo-bar',
  styleUrl: 'o-demo-bar.scss',
  shadow: true
})
export class DemoBarComponent {

  @Prop() name: string;
  @Prop() last: string;

  render() {
    return (
      <div>
      <o-demo-bar-toolbar name={this.name}/>
      <slot/>
      </div>
    );
  }
}
