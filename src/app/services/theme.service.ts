import { Injectable } from '@angular/core';

export enum ThemeMode {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'theme-preference';

  constructor() {
    this.applyTheme(this.getStoredTheme() || ThemeMode.SYSTEM);
  }

  setTheme(mode: ThemeMode) {
    localStorage.setItem(this.storageKey, mode);
    this.applyTheme(mode);
  }

  getTheme(): ThemeMode {
    return this.getStoredTheme() || ThemeMode.SYSTEM;
  }

  private applyTheme(mode: ThemeMode) {
    const html = document.documentElement;

    if (mode === 'system') {
      html.removeAttribute('data-theme'); // terug naar CSS default: light dark
    } else {
      html.setAttribute('data-theme', mode);
    }
  }

  private getStoredTheme(): ThemeMode | null {
    const stored = localStorage.getItem(this.storageKey) as ThemeMode | null;
    return stored && Object.values(ThemeMode).includes(stored) ? stored : null;
  }
}
