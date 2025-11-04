import {Injectable} from '@angular/core';

export enum ThemeMode {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemePalette {
  MAGENTA_VIOLET = 'magenta-violet',
  AZURE_CYAN = 'azure-cyan',
  GREEN_CHARTREUSE = 'green-chartreuse',
  ORANGE_CYAN= 'orange-cyan'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private modeStorageKey = 'theme-preference';
  private paletteStorageKey = 'theme-palette';

  constructor() {
    this.applyTheme(this.getStoredTheme() || ThemeMode.SYSTEM);
    this.applyPalette(this.getStoredPalette() || ThemePalette.MAGENTA_VIOLET);
  }

  setTheme(mode: ThemeMode) {
    localStorage.setItem(this.modeStorageKey, mode);
    this.applyTheme(mode);
  }

  getTheme(): ThemeMode {
    return this.getStoredTheme() || ThemeMode.SYSTEM;
  }

  setPalette(palette: ThemePalette) {
    localStorage.setItem(this.paletteStorageKey, palette);
    this.applyPalette(palette);
  }

  getPalette(): ThemePalette {
    return this.getStoredPalette() || ThemePalette.MAGENTA_VIOLET;
  }

  private applyTheme(mode: ThemeMode) {
    const html = document.documentElement;

    if (mode === 'system') {
      html.removeAttribute('data-theme'); // terug naar CSS default: light dark
    } else {
      html.setAttribute('data-theme', mode);
    }
  }

  private applyPalette(palette: ThemePalette) {
    const html = document.documentElement;

    if (palette === ThemePalette.MAGENTA_VIOLET) {
      html.removeAttribute('data-palette'); // Default palette
    } else {
      html.setAttribute('data-palette', palette);
    }
  }

  private getStoredTheme(): ThemeMode | null {
    const stored = localStorage.getItem(this.modeStorageKey) as ThemeMode | null;
    return stored && Object.values(ThemeMode).includes(stored) ? stored : null;
  }

  private getStoredPalette(): ThemePalette | null {
    const stored = localStorage.getItem(this.paletteStorageKey) as ThemePalette | null;
    return stored && Object.values(ThemePalette).includes(stored) ? stored : null;
  }
}
