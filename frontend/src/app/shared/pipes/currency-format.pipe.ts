import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  /**
   * Formats a number as currency.
   * @param value The number to format.
   * @param locale Optional locale code, defaults to 'en-US'.
   * @param currencyCode Optional currency code, defaults to 'USD'.
   */
  transform(
    value: number | null | undefined,
    locale: string = 'en-US',
    currencyCode: string = 'USD'
  ): string {
    if (value == null) return '';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
} 