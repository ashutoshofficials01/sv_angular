import { Component, OnInit } from '@angular/core';
import { loginCheckDto } from '../../shared/classes-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {

  logEmailId: any = "";
  logPassword: any = "";

  regFName: any = "";
  regLName: any = "";
  regUName: any = "";
  regEmailId: any = "";
  regPassword: any = "";
  regConPassword: any = "";

  logCheckDto: loginCheckDto = new loginCheckDto();

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  registerUser(fName: String, lName: String, uName: String, emailId: String, password: String, role: String) {
    this.logCheckDto.emailId = emailId;
    this.logCheckDto.fullName = fName + " " + lName;
    this.logCheckDto.password = password;
    this.logCheckDto.userName = uName;
    this.logCheckDto.role = role;
    this.logCheckDto.activeStatus = 1;
    this.logCheckDto.statusId = 1;
    this.logCheckDto.userId = 0;

    console.log("log Check :: ", this.logCheckDto);

    this.loginService.registerUser(this.logCheckDto).subscribe((res: loginCheckDto) => {
      console.log("Response :: ", JSON.stringify(res, null, 4));

      if (res.activeStatus == 1 && res.statusId == 1) {
        this.router.navigate(["/login"], { queryParams: { role: role } });
      }
    });
  }

  loginNavPage(role: String) {
    this.router.navigate(["/login"], { queryParams: { role: role } });
  }

}
