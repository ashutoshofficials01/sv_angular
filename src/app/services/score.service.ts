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
        return this.http.post<any>(`${this.url}/resumeUploadIT`, form);
    }

    resumeUploadBusiness(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadTourism`, form);
    }

    resumeUploadFinance(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadIT`, form);
    }

    resumeUploadHealthcare(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadTourism`, form);
    }

    resumeUploadLegal(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadIT`, form);
    }

    resumeUploadGovernment(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadTourism`, form);
    }

    resumeUploadDesign(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadIT`, form);
    }

    resumeUploadConstruction(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUploadTourism`, form);
    }

}