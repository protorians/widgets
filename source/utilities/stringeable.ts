export function encodeHTML (text : string) {
  const buf : string[] = [];
  for (var i = text.length - 1; i >= 0; i--) {
    buf.unshift(['&#' , (`${text[i]}`).charCodeAt(0) , ';'].join(''));
  }
  return buf.join('');
}

export function decodeHTML (text : string) {
  return text.replace(/&#(\d+);/g , (match , dec) => match ? String.fromCharCode(dec) : '');
}

export function stripHTML (text : string) {
  return text.replace(/<\/?[^>]+(>|$)/g , '');
}