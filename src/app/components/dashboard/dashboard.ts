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
  resumeCategory: any = "";


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      this.formatType = Number(param.get('id'));
      this.role = param.get("role");
    });
    // this.fetchLoginData();
  }

  scorePageNavIt() {
    this.router.navigate(["/itScoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }

  scorePageNavFinance() {
    this.router.navigate(["/financeScoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }

  scorePageNavConstruction() {
    this.router.navigate(["/constructionScoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }

  scorePageNavHealthcare() {
    this.router.navigate(["/healthcareScoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }

  scorePageNavEducation() {
    this.router.navigate(["/educationScoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }

  scorePageNavBusiness() {
    this.router.navigate(["/businessScoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }

  scorePageNavDesign() {
    this.router.navigate(["/designScoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }

  scorePageNavGovernment() {
    this.router.navigate(["/governmentScoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }

  scorePageNavTourism() {
    this.router.navigate(["/tourismScoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }

  scorePageNavLegal() {
    this.router.navigate(["/legalScoreboard"], { queryParams: { role: this.role, id: this.formatType } });
  }

  onCategoryChange(resume: String) {
    // if (resume == "it") {
    //   const modal = new (window as any).bootstrap.Modal(
    //     document.getElementById('categoryItModal')
    //   );
    //   modal.show();
    // }
  }


}
