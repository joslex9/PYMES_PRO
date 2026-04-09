import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // 🔥 CLAVE TOTAL
  get role(): string {
    if (isPlatformBrowser(this.platformId)) {
      return (localStorage.getItem('role') || '').replace(/['"]/g, '').trim();
    }
    return '';
  }

  logout(){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.router.navigateByUrl('/');
  }

}