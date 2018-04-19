import {
  Component,
  Event,
  EventEmitter,
  Element,
  Prop,
  Method
} from '@stencil/core';


@Component({
  tag: 'o-demo-resizer',
  styleUrl: 'o-demo-resizer.scss',
  shadow: true
})
export class DemoResizerComponent {
  private desktop: any[] = [
    { size: '1600', name: 'Window xxlarge' },
    { size: '1440', name: 'Window xlarge' },
    { size: '1280', name: 'Window large' },
    { size: '1024', name: 'Window large' },
    { size: '900', name: 'Window medium' },
    { size: '840', name: 'Window medium' },
    { size: '600', name: 'Window small' },
    { size: '480', name: 'Window xsmall' }
  ];

  private mobile: any[] = [
    { size: '1024', name: 'Tablet' },
    { size: '720', name: 'Phablet' },
    { size: '600', name: 'Mobile Landscape' },
    { size: '412', name: 'Mobile Portrait medium' },
    { size: '360', name: 'Mobile Portrait' },
    { size: '280', name: 'Mobile Portrait xsmall' },
  ];

  @Event() resizeButtonClicked: EventEmitter;
  @Element() el: HTMLElement;

  // Component Props
  @Prop() size: string;
  @Prop() viewport: string;


  handleClick(event: any) {
    let evt = event.currentTarget.getAttribute('data-size');
    this.resizeButtonClicked.emit(evt);
    this.setActiveViewPort(evt);
  }


  @Method()
  setActiveViewPort(size?: string) {
    console.log(size);
    const sizeList = Array.from(
      this.el.shadowRoot.querySelectorAll('.item-resize-toolbar')
    );

    sizeList.forEach((el:any) => {
        el.classList.remove('active');
    });

    const activeEl: any = sizeList.filter((el:any)=>{
      console.log(el.getAttribute('data-size') === size);
      return el.getAttribute('data-size') === size;
    });

    if(activeEl.length){
      activeEl[0].classList.add('active');
    }
  }


  render() {
    const viewports = this.viewport === 'desktop' ? this.desktop : this.mobile;
    return (
      <div class="resize-toolbar-container">
        <div class="resize-toolbar">
          {viewports.map(option => {
            var cssSize = { width: `${option.size}px` };
            return (
              <div
                onClick={(event: UIEvent) => this.handleClick(event)}
                class="item-resize-toolbar"
                style={cssSize}
                data-name={option.size}
                data-size={option.size}
              >
                <div class="left device-resizer">{option.size}px</div>
                <div class="rigth device-resizer">{option.size}px</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
