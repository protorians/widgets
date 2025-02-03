// export function decamelize(value: string, separator = '-'): string {
//   return value.replace(/[A-Z]/g, letter => `${separator}${letter.toLowerCase()}`);
// }
//
// export function camelize(value: string): string {
//   return value.trim().replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
// }


export function ucFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function lcFirstLetter(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}
