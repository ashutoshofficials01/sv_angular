import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { constURL } from "../constant/url";
import { Observable } from "rxjs";
import { loginCheckDto } from "../shared/classes-dto";



@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }
    private url = constURL.url;

    registerUser(regSet: loginCheckDto): Observable<loginCheckDto> {
        return this.http.post<loginCheckDto>(`${this.url}/register`, regSet);
    };

    login(emailId: any, password: any, role: any): Observable<loginCheckDto> {
        return this.http.get<loginCheckDto>(this.url + '/login?role=' + role + '&emailId=' + emailId + '&password=' + password);
    }
}