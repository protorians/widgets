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

export function trimSpace(data: string) {
  return data.replace(/ /g, '')
}

export function ucWords(data: string, strict: boolean = false): string {
  return data.split(' ').map(frag => frag.charAt(0).toUpperCase() + (strict ? frag.slice(1).toLowerCase() : frag.slice(1))).join(' ');
}

export function randomName(length: number = 10) {
  const provider = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out: string[] = [];

  for (let index = 0; index < length; index++) {
    out.push(provider.charAt(Math.floor(Math.random() * provider.length)))
  }

  return out.join('');
}


export function logTime(date?: Date) {
  return (date || (new Date())).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}

export function logDateTime(date?: Date) {
  return (date || (new Date())).toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}