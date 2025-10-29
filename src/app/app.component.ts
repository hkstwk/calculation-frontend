import {Component} from '@angular/core';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HttpClientModule, HttpHandler} from '@angular/common/http';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {ThemeMode, ThemePalette, ThemeService} from './services/theme.service';
import {NgIf} from '@angular/common';

@Component({
  imports: [
    MatSidenavContainer,
    MatNavList,
    MatIcon,
    MatToolbar,
    MatListItem,
    MatIconButton,
    MatSidenav,
    RouterLink,
    RouterOutlet,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatButton,
    NgIf
  ],
  providers: [
    HttpClientModule],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {

  protected readonly ThemeMode = ThemeMode;
  protected readonly ThemePalette = ThemePalette;

  isThemeMenuOpen = false;
  isPaletteMenuOpen = false;

  constructor(public themeService: ThemeService) {}

  changeTheme(theme: ThemeMode): void {
    this.themeService.setTheme(theme);
  }

  changePalette(palette: ThemePalette): void {
    this.themeService.setPalette(palette);
  }

  toggleThemeMenu(): void {
    this.isThemeMenuOpen = !this.isThemeMenuOpen;
  }

  togglePaletteMenu(): void {
    this.isPaletteMenuOpen = !this.isPaletteMenuOpen;
  }

  closeThemeMenu(): void {
    this.isThemeMenuOpen = false;
  }

  closePaletteMenu(): void {
    this.isPaletteMenuOpen = false;
  }

  getCurrentThemeIcon(): string {
    const theme = this.themeService.getTheme();
    switch (theme) {
      case ThemeMode.LIGHT: return 'light_mode';
      case ThemeMode.DARK: return 'dark_mode';
      case ThemeMode.SYSTEM: return 'brightness_auto';
      default: return 'brightness_auto';
    }
  }

  getCurrentThemeLabel(): string {
    const theme = this.themeService.getTheme();
    switch (theme) {
      case ThemeMode.LIGHT: return 'Light';
      case ThemeMode.DARK: return 'Dark';
      case ThemeMode.SYSTEM: return 'System';
      default: return 'System';
    }
  }

  getCurrentPaletteClass(): string {
    const palette = this.themeService.getPalette();
    switch (palette) {
      case ThemePalette.MAGENTA_VIOLET: return 'magenta-violet';
      case ThemePalette.AZURE_CYAN: return 'azure-cyan';
      case ThemePalette.GREEN_CHARTREUSE: return 'green-chartreuse';
      default: return 'magenta-violet';
    }
  }

  getCurrentPaletteLabel(): string {
    const palette = this.themeService.getPalette();
    switch (palette) {
      case ThemePalette.MAGENTA_VIOLET: return 'Magenta';
      case ThemePalette.AZURE_CYAN: return 'Azure';
      case ThemePalette.GREEN_CHARTREUSE: return 'Green';
      default: return 'Magenta';
    }
  }
}
