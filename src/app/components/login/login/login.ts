import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { loginCheckDto } from '../../../shared/classes-dto';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login implements OnInit {

  statusId = 0;
  logEmailId: any = "";
  logPassword: any = "";
  logRole: any = "";

  regFName: any = "";
  regLName: any = "";
  regUName: any = "";
  regEmailId: any = "";
  regPassword: any = "";
  regConPassword: any = "";
  regRole: any = "";

  logCheckDto: loginCheckDto = new loginCheckDto();

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  checkLogin(logEmailId: String, logPassword: String, logRole: String) {
    this.loginService.login(logEmailId, logPassword, logRole).subscribe((outcome: loginCheckDto) => {
      console.log("outcome :: ", outcome);
      if (outcome.statusId == 1) {
        this.router.navigate(["/dashboard"], { queryParams: { role: outcome.role, id: outcome.userId } });
      } else if (outcome.statusId == 0) {
        this.router.navigate(["/register"], { queryParams: { role: outcome.role } });
      }
    });
  }

  registerPageNav(role: String) {
    this.router.navigate(["/register"], { queryParams: { role: role } });
  }




}
