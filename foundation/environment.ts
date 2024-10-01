export class Environment {
  static Browser () {
    return typeof window != 'undefined' && typeof document != 'undefined';
  }
}