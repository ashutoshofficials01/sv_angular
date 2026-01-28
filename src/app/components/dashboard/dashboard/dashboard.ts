import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  role: any = String;
  formatType: any = Number;


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      this.formatType = Number(param.get('id'));
      this.role = param.get("role");
    });
    // this.fetchLoginData();
  }

  scorePageNav() {
    this.router.navigate(["/scoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }



}
