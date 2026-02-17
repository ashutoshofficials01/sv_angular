import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { constURL } from "../constant/url";
import { Observable } from "rxjs";
import { ATSDataListDto, loginCheckDto } from "../shared/classes-dto";



@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }
    private url = constURL.url;
    dataArray: any = [];


    fetchATSData(): Observable<ATSDataListDto> {
        return this.http.get<ATSDataListDto>(this.url + '/fetchATSData');
    }

}