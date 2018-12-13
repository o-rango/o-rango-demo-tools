import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'o-demo-case',
  shadow: true
})
export class DemoCaseComponent {
  @Prop() name: string;
}
