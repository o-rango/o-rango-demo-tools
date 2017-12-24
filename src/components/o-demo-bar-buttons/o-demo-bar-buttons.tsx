import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'o-demo-bar-buttons',
  styleUrl: 'o-demo-bar-buttons.scss',
  shadow: true
})
export class DemoButtonsComponent {

  @Event() toolbarButtonClicked: EventEmitter;
  handleClick(event: any) {
    let evt =  event.currentTarget.getAttribute('data-btn');
    this.toolbarButtonClicked.emit(evt);
  }

  render() {
    return (
      <div class="toolbar-icons">
        <svg
          data-btn="mobile"
          onClick={(event: UIEvent) => this.handleClick(event)}
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
        </svg>

        <svg
          data-btn="desktop"
          onClick={(event: UIEvent) => this.handleClick(event)}
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" />
        </svg>
      </div>
    );
  }
}
