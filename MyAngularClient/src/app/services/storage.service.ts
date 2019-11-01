import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {
  }

  static getItem(name: string, isRaw?: boolean) {
    if (!name || !name.length) {
      return null;
    }

    const value = localStorage.getItem(name);

    if (!value || value === 'undefined') {
      return null;
    }

    if (isRaw) {
      return value;
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  static setItem(name: string, value: any, isRaw?: boolean) {
    if (!name || !name.length) {
      return false;
    }

    localStorage.setItem(name, isRaw || typeof value === 'string' ? value.toString() : JSON.stringify(value));
    return true;
  }

  static removeItem(name: string) {
    if (!name || !name.length) {
      return false;
    }

    localStorage.removeItem(name);
  }

  static clearAll() {
    localStorage.clear();
  }
}
