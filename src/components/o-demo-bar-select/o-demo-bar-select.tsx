import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'o-demo-bar-select',
  styleUrl: 'o-demo-bar-select.scss',
  shadow: true
})
export class DemoSelectComponent {

  @Prop() first: string;
  @Prop() last: string;

  render() {
    return (
      <div>
       Demo Select
      </div>
    );
  }
}
