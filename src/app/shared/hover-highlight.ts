import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  // seletor que usamos  no HTML para identificação do própio HTML: [appHoverHighlight]
  selector: '[appHoverHighlight]', 
  standalone: true 
})
export class HoverHighlightDirective { // nome da classe aqui
  constructor(private el: ElementRef, private renderer: Renderer2) { //o Renderer2 faz com que o DOM seja manipulado de forma eficiente e segura
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease-in-out');
  }
// O mouse dentro do elemento.
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 12px 24px rgba(0, 0, 0, 0.4)'); // aplicação de uma sombra mais forte
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-6px)'); 
  }
// O mouse fora do elemento.
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 2px 4px rgba(0, 0, 0, 0.1)'); //sombra padrão
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');  // elemento volta para a posição original ao qual foi apresentado
  }
}