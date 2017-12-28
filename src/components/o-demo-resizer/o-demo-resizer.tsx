import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'o-demo-resizer',
  styleUrl: 'o-demo-resizer.scss',
  shadow: true
})
export class DemoResizerComponent {
  private viewports: any[] = [
    { size: '1600', name: 'Window xlarge' },
    { size: '1440', name: 'Window xlarge' },
    { size: '1280', name: 'Window large' },
    { size: '900', name: 'Window medium' },
    { size: '840', name: 'Window medium' },
    { size: '600', name: 'Window small' },
    { size: '480', name: 'Window xsmall' }
  ];

  @Event() resizeButtonClicked: EventEmitter;
  handleClick(event: any) {
    let evt = event.currentTarget.getAttribute('data-size');
    this.resizeButtonClicked.emit(evt);
  }

  render() {
    return (
      <div class="resize-toolbar-container">
        <div class="resize-toolbar">
          {this.viewports.map(option => {
            var cssSize = {
              width: `${option.size}px`
            };
            return (
              <div
                onClick={(event: UIEvent) => this.handleClick(event)}
                class="item-resize-toolbar"
                style={cssSize}
                data-name={option.size}
                data-size={option.size}
              >
                <div class="left device-resizer">{option.size}</div>
                <div class="rigth device-resizer">{option.size}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
