// src/app/shared/hover-highlight.directive.ts

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  // aqui é o seletor que nós usamos no HTML: [appHoverHighlight]
  selector: '[appHoverHighlight]', 
  standalone: true // mantém como standalone pra facilitar a organização nos arquivos em todas os arquivos do projeto.
})
export class HoverHighlightDirective {

  // o renderer2 faz a ação de manipular o DOM de forma segura.
  constructor(private el: ElementRef, private renderer: Renderer2) { 
    // aqui definimos a transição para que o efeito seja suave 
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease-in-out');
  }

  /**
   * EVENTO 1: Mouse entra no elemento.
   */
  @HostListener('mouseenter') onMouseEnter() {
    // aplicação de uma sombra mais forte
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 12px 24px rgba(0, 0, 0, 0.4)');
    // move o elemento de forma sutil para cima (o efeito "hover")
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-6px)'); 
  }

  /**
   * EVENTO 2: Mouse sai do elemento.
   */
  @HostListener('mouseleave') onMouseLeave() {
    // retornando para a sombra padrão 
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 2px 4px rgba(0, 0, 0, 0.1)'); 
    //  o elemento volta para a posição original
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)'); 
  }
}
