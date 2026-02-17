import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { DashboardService } from '../../services/dashboard.service';
import { ATSDataListDto, ATSResumeListDto, ATSUserListDto } from '../../shared/classes-dto';

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
  dataList: ATSDataListDto = new ATSDataListDto();
  resumeList: ATSResumeListDto[] = [];
  resCount: any = 0;
  userList: ATSUserListDto[] = [];
  userCount: any = 0;
  resumeMonthlyCount: any = 0;

  swiperModules = [Autoplay, Pagination, EffectFade];


  constructor(private router: Router, private route: ActivatedRoute, private dashService: DashboardService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      this.formatType = Number(param.get('id'));
      this.role = param.get("role");
    });
    this.fetchMonthlyATSData();
    // this.fetchLoginData();
  }

  fetchMonthlyATSData() {
    this.dashService.fetchATSData().subscribe((response: ATSDataListDto) => {

      this.dataList = response;

      const { start, end } = this.getPreviousMonthRange();

      this.resumeList = response.resumeDataList;
      this.userList = response.userDataList;

      this.userCount = this.dataList.userDataList.length;
      this.resCount = this.dataList.resumeDataList.length;

      for (let i = 0; i < this.resumeList.length; i++) {
        this.resumeList[i].resumeUploadCount = this.resCount;
      }

      for (let j = 0; j < this.userList.length; j++) {
        this.userList[j].userRegistrationCount = this.userCount;
      }

      // Filter resumes modified in previous month
      const previousMonthResumes = this.resumeList.filter(resume => {
        if (!resume.resModifiedOn) return false;

        const modifiedDate = new Date(resume.resModifiedOn);
        return modifiedDate >= start && modifiedDate <= end;
      });

      this.resumeMonthlyCount = previousMonthResumes.length;

      for (let i = 0; i < this.resumeList.length; i++) {
        this.resumeList[i].resumeUploadCount = this.resumeMonthlyCount;
      }

      console.log("ResumeList For ATS Data :: ", JSON.stringify(this.resumeList, null, 4));
      console.log("UserList For ATS Data :: ", this.userList);
      console.log("DataList For ATS Data :: ", this.dataList);
    })
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

  private getPreviousMonthRange(): { start: Date; end: Date } {
    const now = new Date();

    // First day of current month
    const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Last day of previous month
    const lastDayPreviousMonth = new Date(firstDayCurrentMonth.getTime() - 1);

    // First day of previous month
    const firstDayPreviousMonth = new Date(
      lastDayPreviousMonth.getFullYear(),
      lastDayPreviousMonth.getMonth(),
      1
    );

    return {
      start: firstDayPreviousMonth,
      end: lastDayPreviousMonth
    };
  }

}
