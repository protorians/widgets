export function decamelize(value: string, separator = '-'): string {
  return (`${value[0].toLowerCase()}${value.substring(1)}`)
    .replace(/([A-Z])/g, `${separator}$&`)
    .toLowerCase();
}

export function camelize(value: string) {
  return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (text, index) =>
    index === 0 ? text.toLowerCase() : text.toUpperCase(),
  ).replace(/\s+/g, '');
}
