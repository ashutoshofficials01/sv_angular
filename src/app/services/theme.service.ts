import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  initTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem('theme');
    const html = document.documentElement;

    if (saved === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

 setTheme(isDark: boolean) {
    if (!isPlatformBrowser(this.platformId)) return;

    const html = document.documentElement;

    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
