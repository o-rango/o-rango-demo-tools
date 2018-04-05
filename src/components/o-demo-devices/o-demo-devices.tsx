import { Component } from '@stencil/core';

@Component({
  tag: 'o-demo-devices',
  styleUrl: 'o-demo-devices.scss',
  shadow: false
})
export class DemoDevicesComponent {
  render() {
    return (
      <div class="marvel-device iphone-x">
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
