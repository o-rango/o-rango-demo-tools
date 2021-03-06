
import { h } from '@stencil/core';

export const devices = {
  iphoneX: () => (
    <div class="marvel-device iphone-x">
      <div class="notch">
        <div class="camera"></div>
        <div class="speaker"></div>
      </div>
      <div class="top-bar"></div>
      <div class="sleep"></div>
      <div class="bottom-bar"></div>
      <div class="volume"></div>
      <div class="overflow">
        <div class="shadow shadow--tr"></div>
        <div class="shadow shadow--tl"></div>
        <div class="shadow shadow--br"></div>
        <div class="shadow shadow--bl"></div>
      </div>
      <div class="inner-shadow"></div>
      <div class="screen">
        <slot name="screen" />
      </div>
    </div>
  ),

  iphone8: () => (
    <div class="marvel-device iphone8 silver">
      <div class="top-bar"></div>
      <div class="sleep"></div>
      <div class="volume"></div>
      <div class="camera"></div>
      <div class="sensor"></div>
      <div class="speaker"></div>
      <div class="screen">
        <slot name="screen" />
      </div>
      <div class="home"></div>
      <div class="bottom-bar"></div>
    </div>
  ),

  note8: () => (
    <div class="marvel-device note8">
      <div class="inner"></div>
      <div class="overflow">
        <div class="shadow"></div>
      </div>
      <div class="speaker"></div>
      <div class="sensors"></div>
      <div class="more-sensors"></div>
      <div class="sleep"></div>
      <div class="volume"></div>
      <div class="camera"></div>
      <div class="screen">
        <slot name="screen" />
      </div>
    </div>
  ),
  nexus5: () => (
    <div class="marvel-device nexus5">
      <div class="top-bar"></div>
      <div class="sleep"></div>
      <div class="volume"></div>
      <div class="camera"></div>
      <div class="screen">
        <slot name="screen" />
      </div>
    </div>
  ),

  lumia920: () => (
    <div class="marvel-device lumia920 yellow">
      <div class="top-bar"></div>
      <div class="volume"></div>
      <div class="camera"></div>
      <div class="speaker"></div>
      <div class="screen">
        <slot name="screen" />
      </div>
    </div>
  ),

  iPad: () => (
    <div class="marvel-device ipad silver">
      <div class="camera"></div>
      <div class="screen">
        <slot name="screen" />
      </div>
      <div class="home"></div>
    </div>
  ),
  htc: () => (
    <div class="marvel-device htc-one">
      <div class="top-bar"></div>
      <div class="camera"></div>
      <div class="sensor"></div>
      <div class="speaker"></div>
      <div class="screen">
        <slot name="screen" />
      </div>
    </div>
  )
}
