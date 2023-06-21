import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
  selector: 'tag-component',
  template: `
    <div #tagContainer></div>
  `
})
export class TagComponent implements AfterViewInit {
  @ViewChild('tagContainer', { static: false }) tagContainer!: ElementRef<HTMLDivElement>;

  @Input() tag: string = '';
  @Input() tagContent: string = '';
  @Input() tagEvent: string = '';
  @Input() eventCode: string = '';

  ngAfterViewInit(): void {
    this.renderTag();
  }

  renderTag(): void {
    const tag = this.tag;
    const event = this.tagEvent;
    const code = this.eventCode;

    if (!tag) {
      return;
    }

    let eventAttribute = '';
    let eventHandler = '';

    if (event && code) {
      eventAttribute = `on${event}="executeEventCode()"`;
      eventHandler = `
        window.executeEventCode = function() {
          debugger
          ${code}
        }
      `;
    }

    const tagContainer = this.tagContainer.nativeElement;
    tagContainer.innerHTML = `
      <${tag} ${eventAttribute}>${this.tagContent}</${tag}>
    `;

    if (eventHandler) {
      const tagElement: HTMLElement | null = tagContainer.querySelector(tag);
      if (tagElement) {
        debugger
       // tagElement.addEventListener(event, () => {
          debugger
          eval(eventHandler);
      // });
      }
    }
  }
}
