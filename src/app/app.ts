import { Component, OnInit, signal } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('sv_Angular');

constructor(private themeService: ThemeService) {}

ngOnInit() {
  this.themeService.initTheme();
}

}
