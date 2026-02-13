import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

   isDark = false;

  constructor(private themeService: ThemeService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDark =
        document.documentElement.classList.contains('dark');
    }
  }

  toggleTheme(event: Event) {
   const input = event.target as HTMLInputElement;

  this.isDark = input.checked;
  this.themeService.setTheme(this.isDark);
  }


}
