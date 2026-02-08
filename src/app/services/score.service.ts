import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { constURL } from "../constant/url";
import { Observable } from "rxjs";
import { loginCheckDto } from "../shared/classes-dto";



@Injectable({
    providedIn: 'root'
})
export class ScoreService {
    constructor(private http: HttpClient) { }
    private url = constURL.url;

    // resumeUpload(form: FormData): Observable<any> {
    //     return this.http.post<any>(`${this.url}/resumeUpload`, form, {
    //         reportProgress: true,
    //         observe: "events"
    //     });
    // }

    resumeUploadIT(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadIT`, form);
    }

    resumeUploadTourism(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadTourism`, form);
    }

    resumeUploadEducation(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadEducation`, form);
    }

    resumeUploadBusiness(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadBusiness`, form);
    }

    resumeUploadFinance(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadFinance`, form);
    }

    resumeUploadHealthcare(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadHealthcare`, form);
    }

    resumeUploadLegal(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadLegal`, form);
    }

    resumeUploadGovernment(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadGovernment`, form);
    }

    resumeUploadDesign(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadDesign`, form);
    }

    resumeUploadConstruction(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadConstruction`, form);
    }

}