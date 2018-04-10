import { Component , Prop} from '@stencil/core';
import {CssClassMap} from '../utils/CssClassMap'
@Component({
  tag: 'o-demo-devices',
  styleUrl: 'o-demo-devices.scss',
  shadow: true
})


export class DemoDevicesComponent {
  @Prop() orientation : string;
  @Prop() device : string;
  render() {

    const phoneModel: CssClassMap = {
      'marvel-device iphone-x':true,
      'iphone-x': this.device === 'iphone-x',
      'iphone8': this.device === 'iphone8',
      'nexus5': this.device === 'iphone-x',
      'lumia920': this.device === 'iphone-x',
      'landscape' : this.orientation === 'landscape'
    };

    return (
      <div class={phoneModel}>
        <div class="notch">
          <div class="camera" />
          <div class="speaker" />
        </div>
        <div class="top-bar" />
        <div class="sleep" />
        <div class="bottom-bar" />
        <div class="volume" />
        <div class="overflow">
          <div class="shadow shadow--tr" />
          <div class="shadow shadow--tl" />
          <div class="shadow shadow--br" />
          <div class="shadow shadow--bl" />
        </div>
        <div class="inner-shadow" />
        <div class="screen"><slot/></div>
      </div>
    );
  }
}
