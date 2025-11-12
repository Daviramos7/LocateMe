import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe personalizado para truncar (cortar) strings longas.
 * Adiciona '...' se o texto exceder o limite especificado.
 *
 * Uso: {{ 'Texto muito longo' | truncate:15 }}
 */
@Pipe({
  name: 'truncate',
  standalone: true, // Importante para projetos standalone
})
export class TruncatePipe implements PipeTransform {

  /**
   * Corta uma string se seu comprimento exceder o limite.
   * @param value A string original.
   * @param limit O número máximo de caracteres (padrão é 30).
   * @returns A string truncada ou a string original.
   */
  transform(value: string, limit: number = 30): string {
    if (!value) return '';
    
    // Converte para string para garantir que a propriedade .length exista
    const text = String(value); 

    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    
    return text;
  }
}