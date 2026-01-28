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

    resumeUpload(form: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/resumeUpload`, form);
    }

}