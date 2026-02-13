import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

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

swiperModules = [Autoplay, Pagination, EffectFade];

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

  getCategoryTitle(category: string): string {
  const titles: any = {
    it: 'Technology & IT',
    finance: 'Finance & Accounting',
    construction: 'Engineering & Construction',
    healthcare: 'Healthcare',
    education: 'Education & Academia',
    business: 'Business & Management',
    design: 'Creative & Design',
    government: 'Government & Public Services',
    tourism: 'Hospitality & Tourism',
    legal: 'Legal & Compliance'
  };

  return titles[category] || '';
}


navigateToScore(category: string) {
  switch (category) {
    case 'it':
      this.scorePageNavIt();
      break;
    case 'finance':
      this.scorePageNavFinance();
      break;
    case 'construction':
      this.scorePageNavConstruction();
      break;
    case 'healthcare':
      this.scorePageNavHealthcare();
      break;
    case 'education':
      this.scorePageNavEducation();
      break;
    case 'business':
      this.scorePageNavBusiness();
      break;
    case 'design':
      this.scorePageNavDesign();
      break;
    case 'government':
      this.scorePageNavGovernment();
      break;
    case 'tourism':
      this.scorePageNavTourism();
      break;
    case 'legal':
      this.scorePageNavLegal();
      break;
  }
}



}
