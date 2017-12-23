import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'o-demo-case',
  styleUrl: 'o-demo-case.scss',
  shadow: true
})
export class DemoCaseComponent {

  @Prop() first: string;
  @Prop() last: string;

  render() {
    return (
      <slot/>
    );
  }
}
