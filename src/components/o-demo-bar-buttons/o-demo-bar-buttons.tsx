import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'o-demo-bar-buttons',
  styleUrl: 'o-demo-bar-buttons.scss',
  shadow: true
})
export class DemoButtonsComponent {
  @Event() toolbarButtonClicked: EventEmitter;
  handleClick(event: any) {
    let evt = event.currentTarget.getAttribute('data-btn');
    this.toolbarButtonClicked.emit(evt);
  }

  render() {
    return (
      <div class="toolbar-icons">

     <button class="toolbar-button" >
     <svg
         data-btn="other-devices"
         onClick={(event: UIEvent) => this.handleClick(event)}
         height="24"
         viewBox="0 0 24 24"
         width="24"
         xmlns="http://www.w3.org/2000/svg">
             <path d="M0 0h24v24H0z" fill="none"/>
             <path d="M3 6h18V4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V6zm10 6H9v1.78c-.61.55-1 1.33-1 2.22s.39 1.67 1 2.22V20h4v-1.78c.61-.55 1-1.34 1-2.22s-.39-1.67-1-2.22V12zm-2 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM22 8h-6c-.5 0-1 .5-1 1v10c0 .5.5 1 1 1h6c.5 0 1-.5 1-1V9c0-.5-.5-1-1-1zm-1 10h-4v-8h4v8z"/>
       </svg>
     </button>
     <button class="toolbar-button" >
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
        </button>
        <button class="toolbar-button" >
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
        </button>
      </div>
    );
  }
}
