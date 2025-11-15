import { HoverHighlightDirective } from './hover-highlight'; // importação do arquivo .ts!!

describe('HoverHighlightDirective', () => { 
  it('should create an instance', () => {
    // o mocking de elementref e renderer2 para o teste da diretiva no arquivo
    const mockElementRef: any = { nativeElement: {} };
    const mockRenderer: any = { 
      setStyle: (el: any, style: string, value: string) => {} 
    };

    const directive = new HoverHighlightDirective(mockElementRef, mockRenderer);
    expect(directive).toBeTruthy();
  });
});
